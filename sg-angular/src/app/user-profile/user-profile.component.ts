import { UserProfileService } from './user-profile.service';
import { DataService } from './../../services/data.service';
import { Component, OnChanges, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from './group';
import { User } from './user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  group: Group;
  user: User;
  userData: object;
  groupName: String;
  userEmail: String;
  userName: String;
  image: String;
  loggedIn: boolean;
  constructor(private dataService: DataService, private userProfileService: UserProfileService, private http: HttpClient) {
  }

  ngOnInit() {
    this.loggedIn = false;
    this.userData = this.dataService.getUserData();
    this.userName = this.dataService.getUserName();
    this.userEmail = this.dataService.getUserEmail();
    if(this.userEmail!=null){
      this.getUserInfo();
    }
  }

  getUserInfo(){
    this.userProfileService.getUser(this.userEmail).subscribe(res => {
      this.user = res;
      this.groupName = this.user.groupID;
      if(this.groupName!=null){
        this.getGroupMembers();
      }
      else {
        this.loggedIn = true;
      }
    })
  }
  
  getUsers(){
    this.userProfileService.getUsers().subscribe(res => {
      console.log(res);
    })
  }

  getGroupMembers() {
    this.userProfileService.getGroup(this.groupName).subscribe(res => {
      this.group = res;
      this.loggedIn = true;
    })
  }

  joinGroup() {
    this.updateUserInfo();
    this.getGroupMembers();
    this.userProfileService.createGroup(this.groupName).subscribe((response) => {
      console.log('response from post data is ', response);
    }, (error) => {
      console.log('error during post is ', error)
    })
  }

  // addFriendToGroup(friendEmail: string) {
  //   this.userData = this.dataService.getUserData();
  //   this.dataService.addFriendToGroup(friendEmail);

  //   this.userProfileService.postAPIGroupAdd("FINAL_GROUP", friendEmail).subscribe((response) => {
  //     console.log('response from addFriendToGroup ', response);
  //   }, (error) => {
  //     console.log('error during add friend to group ', error)
  //   })

  //   this.groupMembers = this.dataService.getGroupMembers();
  //   console.log("THIS GROUP MEMB: ", this.groupMembers);
  //   console.log("CURRENT GROUP MEMBERS: ", this.groupMembers);
  // }

  // removeFriendFromGroup(friendEmail: string) {
  //   this.userData = this.dataService.getUserData();
  //   this.dataService.removeFriendFromGroup(friendEmail);

  //   this.userProfileService.postAPIGroupRemove("FINAL_GROUP", friendEmail).subscribe((response) => {
  //     console.log('response from removeFriendFromGroup ', response);
  //   }), (error) => {
  //     console.log('error during remove friend from group ', error)
  //   }
  //   this.groupMembers = this.dataService.getGroupMembers();
  //   console.log("CURRENT GROUP MEMBERS: ", this.groupMembers);
  // }

  updateUserInfo() {
    console.log("Updating User Info");
    console.log("Group: ", this.groupName);
    this.userProfileService.updateUser(this.user.age, this.user.height, this.user.weight, this.groupName).subscribe((response) => {
      console.log('response from post data is ', response);
    }, (error) => {
      console.log('error during post is ', error)
    })
  }
}
