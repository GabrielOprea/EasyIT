import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Professor } from '../../models/professor';
import { User } from '../../models/user';
import { ProfessorService } from '../../services/professor.service';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User();
  professor = new Professor();
  msg = ' ';
  paramName: string | null = "";
  constructor(private _registrationService : RegistrationService, private _professorService : ProfessorService, private _router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void 
  {
     // Access the parameter using paramMap
     this.route.paramMap.subscribe(params => {
      this.paramName = params.get('paramName');
    });

    if(this.paramName == null || this.paramName == "user" || this.paramName == "") {
      $(".nav1").addClass("highlight1")
      $("#home-tab").click(function(){
        $("#profile").hide();
        $("#home").show();
        $(".nav1").addClass("highlight1")
        $(".nav2").removeClass("highlight2")
      });
      $("#profile-tab").click(function(){
        $("#home").hide();
        $("#profile").show();
        $(".nav2").addClass("highlight2")
        $(".nav1").removeClass("highlight1")
      });
    }
    if(this.paramName == "professor") {
      $(".nav2").addClass("highlight1")
      $("#profile").show();
      $("#home").hide();
      $("#home-tab").click(function(){
        $("#profile").hide();
        $("#home").show();
        $(".nav1").addClass("highlight2")
        $(".nav2").removeClass("highlight1")
      });
      $("#profile-tab").click(function(){
        $("#home").hide();
        $("#profile").show();
        $(".nav2").addClass("highlight1")
        $(".nav1").removeClass("highlight2")
      });
    }
  }

  registerUser()
  {
    this._registrationService.registerUserFromRemote(this.user).subscribe(
      data => {
        console.log("Registration Success");
        sessionStorage.setItem("username",this.user.username);
        this._router.navigate(['/registrationsuccess', 'user']);
      },
      error => {
        console.log("Registration Failed");
        console.log(error.error);
        this.msg = "User with "+this.user.email+" already exists !!!";
      }
    )
  }

  registerProfessor()
  {
    this._registrationService.registerProfessorFromRemote(this.professor).subscribe(
      data => {
        console.log("Registration Success");
        sessionStorage.setItem("doctorname",this.professor.professorname);
        this._router.navigate(['/registrationsuccess', 'professor']);
      },
      error => {
        console.log("Registration Failed");
        console.log(error.error);
        this.msg = "Professor with "+this.professor.email+" already exists !!!";
      }
    )
  }

  changeForm(paramName: string)
  {
    this._router.navigate(['/registration', paramName]);
  }

  wrongPassword(password : string) {
    if (
      password.length >= 6 &&
      password.length <= 20 &&
      /[A-Z]/.test(password) &&        // At least one uppercase letter
      /[a-z]/.test(password) &&        // At least one lowercase letter
      /[0-9]/.test(password) &&        // At least one numeric digit
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password)  // At least one special character
    ) {
      // Password meets all criteria
      return false;
    } else {
      // Password does not meet all criteria
      return true;
    }
  }
}