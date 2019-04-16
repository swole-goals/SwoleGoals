import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  constructor(private httpClient: HttpClient) { 
  }

  getUserData() : User {
    this.httpClient.post<User>(environment.fireStoreURL + '/getUser', { 'userEmail': `${this.getUserEmail()}` }, httpOptions).subscribe(res => {
      this.user = res;
    });
    return this.user;
  }
  getUserName(){
    return this.user.name;
  }
  getUserEmail(){
    return this.user.email;
  }
  getUserImage(){
    return this.user.image;
  }
  getUserGroup(){
    return this.user.groupID;
  }
  getUserAge(){
    return this.user.age;
  }
  getUserHeight(){
    return this.user.height;
  }
  getUserWeight(){
    return this.user.weight;
  }

  //Do not call this directly except for during login. Instead call indirectly using the methods below
  setUserData(val: User) {
    this.user = val;
    return this.httpClient.post(environment.fireStoreURL + '/updateUser', this.getUserData(), httpOptions).subscribe(res => {});
  }
  setUserGroup(val: String){
    this.user.groupID = val;
    this.setUserData(this.user);
  }
  setUserInfo(age: Number, height: Number, weight: Number){
    this.user.age = age;
    this.user.height = height;
    this.user.weight = weight;
    this.setUserData(this.user);
  }
}
