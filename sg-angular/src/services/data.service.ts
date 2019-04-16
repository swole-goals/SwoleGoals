import { Group } from './../app/user-profile/group';
import { User } from './../app/user-profile/user';
import { Injectable } from '@angular/core';
import {visitAll} from "@angular/compiler"; 
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {

  static group: Group;
  static user: User;
  static challengeData;
  static groupMembers : Array<string>;
  static challengeName: String;

  constructor() {
    DataService.group;
    DataService.groupMembers = [];
    DataService.challengeData = {};
   }

  static logOut(){
    DataService.challengeData = {};
  }
  static setUserAge(val: Number){
    DataService.user.age = val;
  }
  static setUserHeight(val: Number){
    DataService.user.height = val;
  }
  static setUserWeight(val: Number){
    DataService.user.weight = val;
  }
  static setUserGroup(val: String){
    DataService.user.groupID = val;
  }
  static setUserData(val: User){
    DataService.user = val;
  }

  static setGroupData(val: Group){
    DataService.group = val;
  }
  static setGroupName(val: String){
    DataService.group.name = val;
  }


  static getUserData(){
    return DataService.user;
  }
  static getUserName(){
    return DataService.user.name;
  }
  getchallengeName(): String {
    return DataService.challengeName;
  }

  static getUserEmail(){
    return DataService.user.email;
  }
  static getUserImage(){
    return DataService.user.image;
  }
  static getUserGroup(){
    return DataService.user.groupID;
  }
  static getUserAge(){
    return DataService.user.age;
  }
  static getUserHeight(){
    return DataService.user.height;
  }
  static getUserWeight(){
    return DataService.user.weight;
  }
  static getGroupData(){
    return DataService.group;
  }
  static getGroupUsers(){
    return DataService.group.users;
  }
  static getGroupName(){
    return DataService.group.name;
  }
  
  static setChallengeData(val : object){
    DataService.challengeData = val;
  }
  static setChallengeName(name: String){
    DataService.challengeName = name;
  }
  static getChallengeName(){
    return DataService.challengeName;
  }

  static addFriendToGroup(val : string){
    var index = DataService.groupMembers.indexOf(val);
    console.log("index should be -1", index);
    if (index == -1) {
      DataService.groupMembers.push(val);
    }
    console.log('Group Members after Add: ', DataService.groupMembers)
  }
  static removeFriendFromGroup(val : string){
    var index = DataService.groupMembers.indexOf(val);
    console.log('index is: ', index);
    if (index != -1) {
      DataService.groupMembers.splice(index, 1);
    }
    console.log('Group Members after Remove: ', DataService.groupMembers)
  }
  static getGroupMembers() {
    console.log("getGroupMembers returns: ", DataService.groupMembers)
    return DataService.groupMembers;
  }
}
