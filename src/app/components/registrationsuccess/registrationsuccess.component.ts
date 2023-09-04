import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrationsuccess',
  templateUrl: './registrationsuccess.component.html',
  styleUrls: ['./registrationsuccess.component.css']
})
export class RegistrationsuccessComponent implements OnInit {

  constructor(private router : Router,  private route: ActivatedRoute) { }
  ngOnInit(): void 
  {

        // Access the parameter using paramMap
        this.route.paramMap.subscribe(params => {
          setTimeout(() => {
            console.log("name " + params.get('paramName'));
            this.router.navigate(['login', params.get('paramName')]);
        }, 7000);
        });
  }

}
