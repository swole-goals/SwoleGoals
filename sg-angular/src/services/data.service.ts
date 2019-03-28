import { Injectable } from '@angular/core';
import {visitAll} from "@angular/compiler";
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userData;
  challengeData;
  constructor() {
    this.userData = {};
    this.challengeData = {};
   }

  setUserData(val : object){
    this.userData = val;
    console.log("this is setter method in data service", this.userData);
  }

  setChallengeData(val : object){
    this.challengeData = val;
  }

  getUserData(){
    return this.userData;
  }
}
