import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'  
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/models/chapter';
import { ProfessorService } from 'src/app/services/professor.service';
import * as $ from 'jquery';
import { Course } from 'src/app/models/course';
import { HttpClient } from '@angular/common/http';
import { Material } from 'src/app/models/material';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-addtutorial',
  templateUrl: './addtutorial.component.html',
  styleUrls: ['./addtutorial.component.css']
})
export class AddtutorialComponent implements OnInit {

  chapter = new Chapter();
  todelete : Material[] = [];
  materials : Material[] = [];
  coursenames : Observable<Course[]> | undefined;
  fileName = '';
  validMaterials = 0;
  selectedName = ''
  constructor(private _router : Router, private _userService : UserService, private _service : ProfessorService, private http : HttpClient) {}
    
  ngOnInit() {

    this.materials.push(new Material());
    this.coursenames = this._service.getCourseListNames();

    $("#chapter2btn,#chapter3btn,#chapter4btn,#chapter5btn,#chapter6btn,#chapter7btn,#chapter8btn").hide();
    $("#chapter2,#chapter3,#chapter4,#chapter5,#chapter6,#chapter7,#chapter8").hide();

    $("#chapter1btn").click(function(){
      $("#chapter2,#chapter2btn").show();
      $("#chapter1btn").hide();
    });
    $("#chapter2btn").click(function(){
      $("#chapter3,#chapter3btn").show();
      $("#chapter1btn,#chapter2btn,#remove2btn").hide();
    });
    $("#chapter3btn").click(function(){
      $("#chapter4,#chapter4btn").show();
      $("#chapter1btn,#chapter2btn,#chapter3btn,#remove2btn,#remove3btn").hide();
    });
    $("#chapter4btn").click(function(){
      $("#chapter5,#chapter5btn").show();
      $("#chapter1btn,#chapter2btn,#chapter3btn,#chapter4btn,#remove2btn,#remove3btn,#remove4btn").hide();
    });
    $("#chapter5btn").click(function(){
      $("#chapter6,#chapter6btn").show();
      $("#chapter1btn,#chapter2btn,#chapter3btn,#chapter4btn,#chapter5btn,#remove2btn,#remove3btn,#remove4btn,#remove5btn").hide();
    });
    $("#chapter6btn").click(function(){
      $("#chapter7,#chapter7btn").show();
      $("#chapter1btn,#chapter2btn,#chapter3btn,#chapter4btn,#chapter5btn,#chapter6btn,#remove2btn,#remove3btn,#remove4btn,#remove5btn,#remove6btn").hide();
    });
    $("#chapter7btn").click(function(){
      $("#chapter8,#chapter8btn").show();
      $("#chapter1btn,#chapter2btn,#chapter3btn,#chapter4btn,#chapter5btn,#chapter6btn,#chapter7btn,#remove2btn,#remove3btn,#remove4btn,#remove5btn,#remove6btn,#remove7btn").hide();
    });

    $("#remove2btn").click(function(){
      $("#chapter2").hide();
      $('#chapter2nametxt, #chapter2idtxt').val('');
      $("#chapter1btn").show();
    });
    $("#remove3btn").click(function(){
      $("#chapter3").hide();
      $('#chapter3nametxt, #chapter3idtxt').val('');
      $("#chapter2btn,#remove2btn").show();
    });
    $("#remove4btn").click(function(){
      $("#chapter4").hide();
      $('#chapter4nametxt, #chapter4idtxt').val('');
      $("#chapter3btn,#remove3btn").show();
    });
    $("#remove5btn").click(function(){
      $("#chapter5").hide();
      $('#chapter5nametxt, #chapter5idtxt').val('');
      $("#chapter4btn,#remove4btn").show();
    });
    $("#remove6btn").click(function(){
      $("#chapter6").hide();
      $('#chapter6nametxt, #chapter6idtxt').val('');
      $("#chapter5btn,#remove5btn").show();
    });
    $("#remove7btn").click(function(){
      $("#chapter7").hide();
      $('#chapter7nametxt, #chapter7idtxt').val('');
      $("#chapter6btn,#remove6btn").show();
    });
    $("#remove8btn").click(function(){
      $("#chapter8").hide();
      $('#chapter8nametxt, #chapter8idtxt').val('');
      $("#chapter7btn,#remove7btn").show();
    });
    
  }

  removeMaterial(idex: number) {
    if (this.materials[idex].materialid != null && this.materials[idex].materialid != undefined) {
      let mat = new Material()
      mat.materialid = this.materials[idex].materialid;
      this.todelete.push(mat);
    }
    this.validMaterials -= 1;
    this.materials.splice(idex, 1);

    if (this.validMaterials < 0) {
      this.validMaterials++;
      this.materials.push(new Material());
    }
  }

  updateMaterials() {
  this._userService.getMaterialListByCourseNameAndType(this.selectedName, "material").subscribe(
    data => {
      this.materials = data;
      this.validMaterials = this.materials.length;
      console.log("chapter added Successfully !!!");
    },
    error => {
      this.validMaterials = 0;
      this.materials = [];
      this.materials.push(new Material());
      console.log("chapter adding Failed !!!");
      console.log(error.error);
    });
  }

  addNewMaterial() {
    console.log("push")
    this.validMaterials += 1;
    this.materials.push(new Material());
  }

  addMaterials()
  {
    for (let material of this.materials) {
      material.materialtype = 'tutorial'
      material.coursename = this.selectedName;
    }
    this._service.addNewMaterials(this.materials).subscribe(
      data => {
        console.log("chapter added Successfully !!!");
        this._router.navigate(['/dashboard']);
      },
      error => {
        console.log("chapter adding Failed !!!");
        console.log(error.error);
      }
    )
    this._service.deleteMaterials(this.todelete).subscribe(
      data => {
        console.log("chapter added Successfully !!!");
        this._router.navigate(['/dashboard']);
      },
      error => {
        console.log("chapter adding Failed !!!");
        console.log(error.error);
      }
    )
  }

  onFileSelectedNew(event: Event, idex: number) {
    this.onFileSelected(event);
    const target= event.target as HTMLInputElement;
    if(target.files != null) {
      let file = target.files[0];
      this.materials[idex].materialfile = file.name;
    }
  }
  onFileSelected(event: Event ) {
    const target= event.target as HTMLInputElement;

    
    if(target.files != null) {
     let file = target.files[0];

      if (file) {

          this.fileName = file.name;
          if(!this.fileName.endsWith(".mp4")) {
            alert("Please upload .mp4 !");

            target.value = "";
            return;
          }
          const formData = new FormData();

          formData.append("file", file);
          console.log(formData);
          const upload$ = this.http.post("http://localhost:8080/upload", formData, {
            reportProgress: true,
            responseType: 'json'
          });

          upload$.subscribe();
      }
    }
  }
}
