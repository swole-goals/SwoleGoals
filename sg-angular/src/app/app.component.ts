import { LoginService } from './login/login.service';
//import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit, isDevMode } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'ng-dynami-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'sg-angular';
  loggedIn = false;

  ngOnInit() {
    if (isDevMode()) {
      console.log('👋 Development!');
    } else {
      console.log('💪 Production!');
    }
  }

  constructor(private router : Router, private socialAuthService: AuthService, 
    private loginService : LoginService) {}

  logOut(){
    DataService.logOut();
    this.loggedIn = false;
    console.log("After logged out", DataService.getUserData());
  }

  logIn(socialPlatform : string){
    //this.loginComponent.socialSignIn('google');
    let socialPlatformProvider;
    if (socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then((userData) => {
      this.loginService.postAPIData(userData).subscribe((response) => {
        DataService.setUserData(response);
        console.log(DataService.getUserData());
        this.loggedIn = true;
        if (response != null){
          this.router.navigate(['/app-user-profile']);
        }
      },(error) => {
        console.log('error during post is', error)
      })
    });
  }
}
