import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  profileDetails : Observable<User[]> | undefined;
  user: User = new User;
  msg = ' ';
  currRole = '';
  loggedUser = '';
  temp = false;

  constructor(private _service: UserService, private activatedRoute: ActivatedRoute, private _router : Router) { }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');

    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    $("#profilecard").show();
    $("#profileform").hide();
    this.getProfileDetails(this.loggedUser);
  }

  editProfile()
  {
    $("#profilecard").hide();
    $("#profileform").show();
  }

  getProfileDetails(loggedUser : string)
  {
    this.profileDetails = this._service.getProfileDetails(this.loggedUser);
    console.log(this.profileDetails);
  }

  updateUserProfile()
  {
    this._service.UpdateUserProfile(this.user).subscribe(
      data => {
        console.log("UserProfile Updated succesfully");
        this.msg = "Profile Updated Successfully!";
        $(".editbtn").hide();
        $("#message").show();
        this.temp = true;
        $("#profilecard").show();
        $("#profileform").hide();
        setTimeout(() => {
            this._router.navigate(['/userdashboard']);
          }, 6000);
      },
      error => {
        console.log("Profile Updation Failed");
        console.log(error.error);
        this.msg = "Profile Updation Failed !";
      }
    )
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
