import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { DataService } from './../services/data.service';
import { Component, OnInit, isDevMode } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'ng-dynami-social-login';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'sg-angular';
  loggedIn = false;

  ngOnInit() {
    this.router.navigate(['/app-splash']);
    if (isDevMode()) {
      console.log('👋 Development!');
    } else {
      console.log('💪 Production!');
    }
  }

  constructor(private router : Router, private socialAuthService: AuthService, 
    private loginService : LoginService, private userService: UserService) {}

  logOut(){
    DataService.logOut();
    this.loggedIn = false;
  }

  logIn(socialPlatform : string){
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
        console.log(response);
        this.userService.setUserData(response);
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
