import { Group } from './../app/user-profile/group';
import { Injectable } from '@angular/core';
import {visitAll} from "@angular/compiler"; 
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {

  static group: Group;
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

  static setGroupData(val: Group){
    DataService.group = val;
  }
  static setGroupName(val: String){
    DataService.group.name = val;
  }

  getchallengeName(): String {
    return DataService.challengeName;
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
