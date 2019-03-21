import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'ng-dynami-social-login';
//import { AuthService } from "angularx-social-login";
//import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService) { }
 
  ngOnInit() {
  }
 
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
 
        console.log(userData);      
      }
    );
  }


  /*ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  constructor(private authService: AuthService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
*/
}



/*import { Component, OnInit } from '@angular/core';
import {GoogleSignInSuccess} from 'angular-google-signin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  private myClientId: string = '276075475404-gjouku37354fsjqrm631f9q9s29vm3im.apps.googleusercontent.com';

  constructor() {}
  ngOnInit() {
    
  }
}



export class LoginComponent {
  private myClientId: string = '276075475404-gjouku37354fsjqrm631f9q9s29vm3im.apps.googleusercontent.com';

  constructor() {

  }
 
  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('ID: ' +
      profile
        .getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
  }
}



export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/

