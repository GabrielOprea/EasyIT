import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser = '';
  currRole = '';
  title = '';
  shown = false;

  constructor(private activatedRoute: ActivatedRoute, public _router : Router) { }

  getLoggedUser(): string | null {
    return sessionStorage.getItem('loggedUser');
  }

  ngOnInit(): void 
  {
    this.loggedUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    this.loggedUser = this.loggedUser.replace(/"/g, '');
    if(this.loggedUser === '{}') {
      this.loggedUser = '';
    }
    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');

    if(this.loggedUser === "admin@gmail.com"){
      this.title = "Admin Dashboard";
    }
    else if(this.currRole === "professor"){
      this.title = "";
    }
    else if(this.currRole === "user"){
      this.title = "";
    }

    $(".sidebar").hide();
  }

  logout()
  {
    sessionStorage.clear();
    this._router.navigate(['/']);
    this.loggedUser = '';
  }

  navigateHome()
  {
    this.currRole = JSON.stringify(sessionStorage.getItem('ROLE')|| '{}'); 
    this.currRole = this.currRole.replace(/"/g, '');
    if(this.loggedUser === "admin@gmail.com"){
      this._router.navigate(['/admindashboard']);
    }
    else if(this.currRole === "professor"){
      this._router.navigate(['/dashboard']);
    }
    else if(this.currRole === "user"){
      this._router.navigate(['/dashboard']);
    }
  }

  getPath(): string {
    console.log(sessionStorage.getItem('LOGGEDIN') );
    if (sessionStorage.getItem('LOGGEDIN') == 'TRUE') {
      console.log("AQI");
      return '/dashboard'
    }
    return this._router.url;
  }

  login(paramName: string)
  {
    this._router.navigate(['/login', paramName]);
  }

  registration(paramName: string)
  {
    this._router.navigate(['/registration', paramName]);
  }

  showMenu() {
    if(!this.shown) {
     $(".sidebar").show();
    } else {
      $(".sidebar").hide();
    }
    this.shown = !this.shown;
  }
}
