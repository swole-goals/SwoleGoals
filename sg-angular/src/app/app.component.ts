import { LoginService } from './login/login.service';
//import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'ng-dynami-social-login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sg-angular';
  loggedIn = false;
  userInfo : object;
  userImage : string;

  constructor(private dataService : DataService, private router : Router, private socialAuthService: AuthService, 
    private loginService : LoginService) {}

  logOut(){
    this.dataService.logOut();
    this.loggedIn = false;
    console.log("After logged out", this.dataService.getUserName());
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
      this.userImage = userData.image;

      this.loginService.postAPIData(userData).subscribe((response) => {
        console.log('response from post data is', response);
        this.userInfo = response;
        this.dataService.setUserData(response);
        this.dataService.setUserImage(this.userImage);
        this.loggedIn = true;
        if (this.userInfo != null){
          this.router.navigate(['/app-user-profile']);
        }
        console.log('current logged in user is', this.dataService.getUserName());
      },(error) => {
        console.log('error during post is', error)
      })
    });
  }
}
