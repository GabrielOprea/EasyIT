import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Chapter } from 'src/app/models/chapter';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';
import { Course } from 'src/app/models/course';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post';
import { Announcement } from 'src/app/models/announcement';
import { ProfessorService } from 'src/app/services/professor.service';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-fullcourse',
  templateUrl: './fullcourse.component.html',
  styleUrls: ['./fullcourse.component.css']
})
export class FullcourseComponent implements OnInit {


  chapterlist :Chapter[] | undefined
  courselist : Observable<Course[]> | undefined;
  chapter = new Chapter();
  fileToDownload = '';
  showQA = false;
  showDownloads = false;
  showTutorials = false;
  showAnnouncements = false;
  showNotes = false;
  crtQuestion = '';
  crtAnn = '';
  courseName = '';
  courseid = '';
  currRole = '';
  postlist: Post[] | undefined
  announcementlist: Announcement[] | undefined
  constructor(private _router : Router,  private _profservice : ProfessorService, private _service : UserService, private activatedRoute: ActivatedRoute, private _http : HttpClient) { }

  ngOnInit(): void {
    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    $("#qa, #notes, #announcements, #questions, #notestxt, #announcementslist, #downloads").hide();
    this.courseName = this.activatedRoute.snapshot.params['coursename'];
    this._service.getCourseListByName(this.courseName).subscribe(
      data => {
        this.courseid = data[0].courseid;
        this._service.getPostsByCourseid(this.courseid).subscribe(
          data=> {
            this.postlist = data;
            console.log(this.postlist);
          }
        )

        this._service.getAnnouncementsByCourseid(this.courseid).subscribe(
          data=> {
            this.announcementlist = data;
            console.log(this.postlist);
          }
        )

      }
    )


    this._service.getChappterListByCourseName(this.courseName).subscribe(
    data => {
      this.chapterlist = data;
      console.log("chapter added Successfully !!!");
    },
    error => {
      console.log("chapter adding Failed !!!");
      console.log(error.error);
    });

    this.courselist = this._service.getCourseListByName(this.courseName);

  }

  newAnn() {
    $("#announcementslist").toggle();

  }

  addAnn() {
    let crtPost = new Announcement();
    crtPost.content = this.crtAnn;
    this.crtAnn = '';
    crtPost.courseid = this.courseid;
    let loggedUsername = JSON.stringify(sessionStorage.getItem('name')|| '{}');
    loggedUsername = loggedUsername.replace(/"/g, '');
    crtPost.poster = loggedUsername
    let date = new Date();
    crtPost.timestamp = date.getDate() + "/" + date.getMonth() + "/"  + date.getFullYear() + '-' + date.getHours() + ":" + date.getMinutes();
    this._profservice.addAnnouncement(crtPost).subscribe(
      data => {
        console.log("QA added Successfully !!!");
        console.log(data);        
        location.reload();
      }
    )
  }

  addQa() {
    let crtPost = new Post();
    crtPost.content = this.crtQuestion;
    this.crtQuestion = '';
    crtPost.courseid = this.courseid;
    let loggedUsername = JSON.stringify(sessionStorage.getItem('name')|| '{}');
    loggedUsername = loggedUsername.replace(/"/g, '');
    crtPost.poster = loggedUsername
    let date = new Date();
    crtPost.timestamp = date.getDate() + "/" + date.getMonth() + "/"  + date.getFullYear() + '-' + date.getHours() + ":" + date.getMinutes();
    this._service.addPost(crtPost).subscribe(
      data => {
        console.log("QA added Successfully !!!");
        console.log(data);        
        location.reload();
      }
    )
  }

  openQandA()
  {

    if(!this.showQA) {
      $("#qa").show();
    } else {
      $("#qa").hide();
    }
    this.showQA = !this.showQA;
  }
  openNotes()
  {
    if(!this.showNotes) {
      $("#notes").show();
    } else {
      $("#notes").hide();
    }
    this.showNotes = !this.showNotes;
  }
  openAnnouncements()
  {
    if(!this.showAnnouncements) {
      $("#announcements").show();
    } else {
      $("#announcements").hide();
    }
    this.showAnnouncements = !this.showAnnouncements;
  }
  openTutorials() {
    if(!this.showTutorials) {
      $("#tutorials").show();
    } else {
      $("#tutorials").hide();
    }
    this.showTutorials = !this.showTutorials;
  }
  openDownloads()
  {
    if(!this.showDownloads) {
      $("#downloads").show();
    } else {
      $("#downloads").hide();
    }
    this.showDownloads = !this.showDownloads;
  }
  newQuestion()
  {
    $("#questions").toggle();
  }
  newNotes()
  {
    $("#notestxt").toggle();
  }

  set1()
  {
    $(".box1").css("background-color","green");
    $(".chapter1").addClass("selected");
    $(".box2,.box3,.box4,.box5,.box6,.box7,.box8").css("background-color","white");
    $(".chapter2,.chapter3,.chapter4,.chapter5,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set2()
  {
    $(".box2").css("background-color","green");
    $(".chapter2").addClass("selected");
    $(".box1,.box3,.box4,.box5,.box6,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter3,.chapter4,.chapter5,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set3()
  {
    $(".box3").css("background-color","green");
    $(".chapter3").addClass("selected");
    $(".box1,.box2,.box4,.box5,.box6,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter4,.chapter5,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set4()
  {
    $(".box4").css("background-color","green");
    $(".chapter4").addClass("selected");
    $(".box1,.box2,.box3,.box5,.box6,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter5,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set5()
  {
    $(".box5").css("background-color","green");
    $(".chapter5").addClass("selected");
    $(".box1,.box2,.box3,.box4,.box6,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter4,.chapter6,.chapter7,.chapter8").removeClass("selected");
  }
  set6()
  {
    $(".box6").css("background-color","green");
    $(".chapter6").addClass("selected");
    $(".box1,.box2,.box3,.box4,.box5,.box7,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter4,.chapter5,.chapter7,.chapter8").removeClass("selected");
  }
  set7()
  {
    $(".box7").css("background-color","green");
    $(".chapter7").addClass("selected");
    $(".box1,.box2,.box3,.box4,.box5,.box6,.box8").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter4,.chapter5,.chapter6,.chapter8").removeClass("selected");
  }
  set8()
  {
    $(".box8").css("background-color","green");
    $(".chapter8").addClass("selected");
    $(".box1,.box2,.box3,.box4,.box5,.box6,.box7").css("background-color","white");
    $(".chapter1,.chapter2,.chapter3,.chapter4,.chapter5,.chapter6,.chapter7").removeClass("selected");
  }

  openChapter(chapterid : string)
  {
    this.fileToDownload = chapterid;
    console.log(chapterid);
  }

  isScriptLoaded(target: string): boolean
  {
    return document.querySelector('script[src="' + target + '"]') ? true : false
  }

  downloadPdf(chapterid : string) {
    console.log(this.fileToDownload);
 
    window.open("http://localhost:8080/files/" + chapterid);
  }

  openDoc() {
    const pdfUrl = './assets/Introduction to Spring MVC.pdf';
    window.open(pdfUrl + '#page=1', '_blank', '');
  }

  showMenu(id: string) {
  }
}
