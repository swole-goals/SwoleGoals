import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userData;
  constructor() {
    this.userData = {};
   }

  setUserData(val : object){
    this.userData = val;
    console.log("this is setter method in data service", this.userData);
  }

  getUserData(){
    return this.userData;
  }
}
