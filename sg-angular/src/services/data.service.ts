import { Injectable } from '@angular/core';

import { FriendUpdateService } from 'src/app/friends/friendupdate.service';

import {visitAll} from "@angular/compiler";
 
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  userData;
  challengeData;
  challengeName: string;
  userImage: String;
  groupID: String;
  groupData;
  groupMembers : Array<string>;

  constructor() {
    this.userData = {};
    this.groupMembers = [];
    this.challengeData = {};
   }

  logOut(){
    this.userData = {};
    this.challengeData = {};
  }
  setUserData(val : object){
    this.userData = val;
  }

  setChallengeData(val : object){
    this.challengeData = val;
  }

  getchallengeName(): string {
    return this.challengeName;
  }

  setchallengeName(value: string) {
    this.challengeName = value;
  }

  getUserData(){
    return this.userData;
  }
  getUserEmail(){
    return this.userData.email;
  }
  getUserName(){
    return this.userData.name;
  }
  getUserAge(){
    return this.userData.age;
  }
  setUserImage(image : String){
    this.userImage = image;
  }
  getUserImage(){
    return this.userImage;
  }
  getUserGroup(){
    return this.userData.groupID;
  }
  getUserHeight(){
    return this.userData.height;
  }
  getUserWeight(){
    return this.userData.weight;
  }

  addFriendToGroup(val : string){
    var index = this.groupMembers.indexOf(val);
    console.log("index should be -1", index);
    if (index == -1) {
      this.groupMembers.push(val);
    }
    console.log('Group Members after Add: ', this.groupMembers)
  }
  removeFriendFromGroup(val : string){
    var index = this.groupMembers.indexOf(val);
    console.log('index is: ', index);
    if (index != -1) {
      this.groupMembers.splice(index, 1);
    }
    console.log('Group Members after Remove: ', this.groupMembers)
  }
  getGroupMembers() {
    console.log("getGroupMembers returns: ", this.groupMembers)
    return this.groupMembers;
  }
}
