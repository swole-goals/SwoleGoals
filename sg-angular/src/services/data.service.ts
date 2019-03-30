import { Injectable } from '@angular/core';
import { FriendUpdateService } from 'src/app/friends/friendupdate.service';
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userData;
  groupMembers : Array<string>;
  constructor() {
    this.userData = {};
    this.groupMembers = [];
  }
  setUserData(val : object){
    this.userData = val;
    console.log("this is setter method in data service", this.userData);
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
    this.groupMembers.push(val);
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
    return this.getGroupMembers;
  }
}