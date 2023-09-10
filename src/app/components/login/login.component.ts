import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Professor } from '../../models/professor';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  professor = new Professor();
  msg = "";
  adminEmail = "";
  adminPassword = "";
  paramName: string | null = "";
  constructor(private _service : LoginService, private _router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void 
  {
     // Access the parameter using paramMap
     this.route.paramMap.subscribe(params => {
      this.paramName = params.get('paramName');
    });

    if(this.paramName == null || this.paramName == "user" || this.paramName == "") {
      $(".admin-login-form").hide();
      $(".professor-login-form").hide();
      $("#userbtn").css("border", "0").css("opacity", "1");
      $("#professorbtn").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("border-left", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");;
      $("#adminbtn").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
    }

    
    if(this.paramName == "admin") {
      $(".user-login-form").hide();
      console.log('admin@gmail.com')
      console.log('admin123')
      $(".admin-login-form").show();
      $(".professor-login-form").hide();
      $("#userbtn").css("border", "0").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
      $("#adminbtn").css("border", "0").css("opacity", "1");
      $("#professorbtn").css("border", "0").css("border-right", "1.5px solid rgb(6, 50, 53)").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");;
    }
    if(this.paramName == "professor") {
      $(".user-login-form").hide();
      $(".admin-login-form").hide();
      $(".professor-login-form").show();
      $("#userbtn").css("border", "0").css("border-right", "1.5px solid rgb(6, 50, 53)").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
      $("#adminbtn").css("border", "0").css("border-left", "1.5px solid rgb(6, 50, 53)").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
      $("#professorbtn").css("border", "0").css("opacity", "1");
    }

    $(".userlogin").click(function(){
      $(".user-login-form").hide();
      $(".admin-login-form").show();
    });

    $("#userbtn").click(function(){
      $(".user-login-form").show();
      $(".admin-login-form").hide();
      $(".professor-login-form").hide();
      $("#userbtn").css("border", "0").css("opacity", "1");
      $("#adminbtn").css("border", "0").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "1").css("opacity", "0.3");
      $("#professorbtn").css("border", "0").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("border-left", "1.5px solid rgb(6, 50, 53)").css("opacity", "1").css("opacity", "0.3");
    });

    $("#professorbtn").click(function(){
      $(".user-login-form").hide();
      $(".admin-login-form").hide();
      $(".professor-login-form").show();
      $("#userbtn").css("border", "0").css("border-right", "1.5px solid rgb(6, 50, 53)").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
      $("#adminbtn").css("border", "0").css("border-left", "1.5px solid rgb(6, 50, 53)").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
      $("#professorbtn").css("border", "0").css("opacity", "1");
    });

    $("#adminbtn").click(function(){
      $(".user-login-form").hide();
      $(".admin-login-form").show();
      $(".professor-login-form").hide();
      $("#userbtn").css("border", "0").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");
      $("#adminbtn").css("border", "0").css("opacity", "1");
      $("#professorbtn").css("border", "0").css("border-right", "1.5px solid rgb(6, 50, 53)").css("border-bottom", "1.5px solid rgb(6, 50, 53)").css("opacity", "0.3");;
    });
    
    $(".adminlogin").click(function(){
      $(".user-login-form").show();
      $(".admin-login-form").hide();
    });
  }

  loginUser()
  {
      this._service.loginUserFromRemote(this.user).subscribe(
        (data: any) => {
          console.log(data);
          console.log("Response Received");
          sessionStorage.setItem('loggedUser', this.user.email);
          sessionStorage.setItem('USER', "user");
          sessionStorage.setItem('ROLE', "user");
          sessionStorage.setItem('name', data.username);
          sessionStorage.setItem('LOGGEDIN', 'TRUE');

          this._router.navigate(['/dashboard']);
        },
        (error: { error: any; }) => {
          console.log(error.error);
          this.msg="Bad credentials!";
        }
      )
  }

  loginProfessor()
  {
      this._service.loginProfessorFromRemote(this.professor).subscribe(
        (data: any) => {
          console.log(data);
          console.log("Response Received");
          sessionStorage.clear();
          sessionStorage.setItem('loggedUser', this.professor.email);
          sessionStorage.setItem('USER', "professor");
          sessionStorage.setItem('ROLE', "professor");
          sessionStorage.setItem('professorname',this.professor.email);
          sessionStorage.setItem('name', data.professorname);
          sessionStorage.setItem('LOGGEDIN', 'TRUE');
            
          this._router.navigate(['/dashboard']);
        },
        (error: { error: any; }) => {
          console.log(error.error);
          this.msg="Bad credentials!";
        }
      )
  }

  adminLogin()
  {
    if(this._service.adminLoginFromRemote(this.adminEmail, this.adminPassword)) 
    {
      sessionStorage.setItem('loggedUser', this.adminEmail);
      sessionStorage.setItem('USER', "admin");
      sessionStorage.setItem('ROLE', "admin");
      sessionStorage.setItem('name', "admin");
      sessionStorage.setItem('gender', "male");
      this._router.navigate(['/admindashboard']);
    }
    else 
    {
      console.log("Exception Occured");
      this.msg = 'Bad admin credentials !'
    }
  }

  changeForm(paramName: string)
  {
    this._router.navigate(['/login', paramName]);
  }
}
