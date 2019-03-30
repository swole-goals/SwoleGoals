import { Injectable } from '@angular/core';
import {visitAll} from "@angular/compiler";
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userData;
  challengeData;
  userImage: String;
  constructor() {
    this.userData = {};
    this.challengeData = {};
   }

  logOut(){
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
    console.log("Setting image to ", image);
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
}
