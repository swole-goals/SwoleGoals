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
  private user: User;
  private loggedIn: boolean;
  constructor(private httpClient: HttpClient) { }

  login(loginData): Observable<User>{
    return this.httpClient.post<User>(environment.fireStoreURL+'/addUser', {'name' : `${loginData.name}`, 'email' : `${loginData.email}`, 'image' : `${loginData.image}`});
  }
  logout(){
    this.loggedIn = false;
  }
  setLoggedIn(){
    this.loggedIn = true;
  }
  isLoggedIn(): boolean{
    return this.loggedIn;
  }
  hasGroup(): boolean{
    if(this.user.groupID!=null){
      return true;
    }
    return false;
  }

  getUserData(): User {
    this.httpClient.post<User>(environment.fireStoreURL + '/getUser', { 'userEmail': `${this.getUserEmail()}` }, httpOptions).subscribe(res => {
      this.user = res;
    });
    console.log(this.user);
    return this.user;
  }
  getUserName(): string{
    return this.user.name;
  }
  getUserEmail(): string{
    return this.user.email;
  }
  getUserImage(): string{
    return this.user.image;
  }
  getUserGroup(): string{
    return this.user.groupID;
  }
  getUserAge(): Number{
    return this.user.age;
  }
  getUserHeight(): Number{
    return this.user.height;
  }
  getUserWeight(): Number{
    return this.user.weight;
  }

  //Do not call this directly except for during login. Instead call indirectly using the methods below
  setUserData(val: User) {
    this.user = val;
    return this.httpClient.post(environment.fireStoreURL + '/updateUser', this.user, httpOptions).subscribe(res => {});
  }
  setUserGroup(val: string){
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
