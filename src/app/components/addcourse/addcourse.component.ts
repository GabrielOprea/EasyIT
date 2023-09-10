import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { ProfessorService } from 'src/app/services/professor.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs/internal/Observable';
import { Professor } from 'src/app/models/professor';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  course = new Course();
  msg = ' ';
  loggedUser = '';
  currRole = '';
  approval : Observable<Professor[]> | undefined;
  professorlist : Observable<Professor[]> | undefined;
  approveError = false;
  
  constructor(private _professorService : ProfessorService, private _router : Router) { }

  ngOnInit(): void 
  {

    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    this.professorlist = this._professorService.getProfessorList();
    this.approval = this._professorService.getProfessorListByEmail(this.loggedUser);

    $("#websitelink, #youtubelink").css("display","none");
    $("#websitelink").hide();
    
    $("select").on('change', function() {
      $(this).find("option:selected").each(function() {
          var option = $(this).attr("value");
          if(option === "Website") {
            $("#websitelink").css("display","block");
            $("#youtubelink").css("display","none");
          } 
          else if(option === "Youtube")
          {
            $("#youtubelink").css("display","block");
            $("#websitelink").css("display","none");
          }
      });
    }).change();
  }

  addCourse()
  {

    this.approval?.subscribe(
      data=> {
        if (data[0].status != 'accept') {
          console.log("NOO!!!!");
          this.approveError = true;
        } else {
          this._professorService.addCourse(this.course).subscribe(
            data => {
              console.log("Course added Successfully !!!");
              this._router.navigate(['/addchapter']);
            },
            error => {
              console.log("Process Failed");
              console.log(error.error);
              this.msg = "Course with name "+this.course.coursename+" already exists!";
            }
          )     
        }
      }
    )
  }
}
