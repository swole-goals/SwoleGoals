//import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sg-angular';
  loggedIn = false;

  constructor(private dataService : DataService, private router : Router) {}

  logOut(){
    this.dataService.logOut();
    this.loggedIn = false;
  }

  LogIn(){
    //this.loginComponent.socialSignIn('google');
  }
}
