import { UserProfileService } from './user-profile.service';
import { DataService } from './../../services/data.service';
import { Component, OnChanges, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from './group';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loggedIn: boolean;
  hasGroup: boolean;
  groupName: String;
  groupMembers: Array<string>;
  userName: String;
  userEmail: String;
  image: String;
  age: Number;
  height: Number;
  weight: Number;
  constructor(private userProfileService: UserProfileService, private http: HttpClient) {
  }

  ngOnInit() {
    this.loggedIn = false;
    this.hasGroup = false;
    if(DataService.getUserEmail()!=null){
      this.getUserInfo();
    }
  }

  getUserInfo(){
    this.userProfileService.getUser(DataService.getUserEmail()).subscribe(res => {
      DataService.setUserData(res);
      this.age = DataService.getUserAge();
      this.height = DataService.getUserHeight();
      this.weight = DataService.getUserWeight();
      this.groupName = DataService.getUserGroup();
      this.userEmail = DataService.getUserEmail();
      this.image = DataService.getUserImage();
      this.userName = DataService.getUserName();
      console.log(this.groupName);
      if(this.groupName!="null" && this.groupName!=null){
        console.log(this.groupName);
        this.getGroupMembers();
      }
      else {
        console.log("Logged In");
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
      DataService.setGroupData(res);
      this.groupMembers = DataService.getGroupUsers();
      this.hasGroup = true;
      this.loggedIn = true;
    })
  }

  joinGroup() {
    this.updateUserInfo();
    this.getGroupMembers();
    this.userProfileService.createGroup(this.groupName).subscribe((response) => {
      console.log('response from post data is ', response);
      DataService.setGroupData(response);
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
    DataService.setUserGroup(this.groupName);
    DataService.setUserAge(this.age);
    DataService.setUserHeight(this.height);
    DataService.setUserWeight(this.weight);
    this.userProfileService.updateUser().subscribe((response) => {
      console.log('response from post data is ', response);
    }, (error) => {
      console.log('error during post is ', error)
    })
  }
}
