import { Component, OnInit } from '@angular/core';
import { UserInfo } from './friendsinfo';
import { UserListService } from './friends.service';
import { FriendUpdateService } from './friendupdate.service';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'ng-dynami-social-login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers: [UserListService]
})
export class FriendsComponent implements OnInit {
  public userList: Array<UserInfo>;
  userData;


  constructor(private userService: UserListService, private router: Router, private friendUpdateService : FriendUpdateService, private dataService : DataService) {
      this.userService.getUserListUnfiltered().subscribe(res => {
      this.userList = res;
    })
   }

  ngOnInit() {
  }

  public addFriend(friendEmail : string) {
    
    this.userData = this.dataService.getUserData(); 
    console.log("friendComponent: current logged in user is: ", this.dataService.getUserData());

   /* this.friendUpdateService.postAPIData(this.userData.email, friendEmail).subscribe((response)=>{
      console.log('response from post data is ', response);
    },(error)=>{
      console.log('error during post is ', error)
    })*/

    this.friendUpdateService.postAPIDataGroup("FINAL_GROUP", friendEmail).subscribe((response)=>{
      console.log('response from addFriendToGroup ', response);
    },(error)=>{
      console.log('error during post is ', error)
    })
  }

  public addFriendToGroup(friendEmail : string) {
    this.userData = this.dataService.getUserData();

    this.friendUpdateService.postAPIDataGroup("FINAL_GROUP", friendEmail).subscribe((response)=>{
        console.log('response from addFriendToGroup ', response);
    },(error)=>{
      console.log('error during post is ', error)
    })
  }
}
