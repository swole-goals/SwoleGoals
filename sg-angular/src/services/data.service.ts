import { Group } from './group';
import { Injectable } from '@angular/core';
import {visitAll} from "@angular/compiler"; 
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {

  static challengeData;
  static groupMembers : Array<string>;
  static challengeName: String;

  constructor() {
    DataService.groupMembers = [];
    DataService.challengeData = {};
   }

  static logOut(){
    DataService.challengeData = {};
  }

  getchallengeName(): String {
    return DataService.challengeName;
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

}
