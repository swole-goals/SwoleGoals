import { UserProfileComponent } from './../user-profile/user-profile.component';
import { DataService } from './../../services/data.service';
import { UserInfo } from './../friends/friendsinfo';
import { LoginService } from './login.service';
import { Component, OnInit, AfterViewInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'ng-dynami-social-login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('first') d1 : ElementRef;
  @ViewChild('second') d2 : ElementRef;

  userInfo : object;
  message : string;
  constructor(private socialAuthService: AuthService, private router: Router, private loginService : LoginService, 
    private dataService : DataService, private userprofile : UserProfileComponent, private render : Renderer,
    private first : ElementRef, /*private second : ElementRef*/) { }
 
  ngOnInit() {
    //this.dataService.currentMessage.subscribe(message => this.message = message)
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
        
        this.userInfo = userData;

        this.printConsole();
        // this.loginService.postAPIData(userData).subscribe((response)=>{
        //   console.log('response from post data is ', response);
        //   this.userInfo = response;
        //   this.dataService.setUserData(response);
        // },(error)=>{
        //   console.log('error during post is ', error)
        // })

      }
    );

    //console.log('?????????XXXXXX',this.userInfo)
    //this.first.nativeElement.style.display = 'none';
    this.d1.nativeElement.style.display = 'none';
    this.d2.nativeElement.style.display = 'block';
    //this.second.nativeElement.style.display = 'block';
  }

  printConsole(){
      console.log('hehehehhhehhehe',this.userInfo);
  }


}


/*
  public register() {
    constructor(private router: Router){
    }
    this.router.navigate(['/register']);
  }
*/

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

