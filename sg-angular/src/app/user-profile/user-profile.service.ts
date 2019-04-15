import { HttpClient } from '@angular/common/http';
import { DataService } from './../../services/data.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Group } from './group'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  userEmail
  constructor(private httpClient: HttpClient) { }

  postAPIGroupAdd(groupName, userEmail) {
    console.log("Reached postAPIDataGroup with groupName: ", groupName)
    return this.httpClient.post(environment.fireStoreURL + '/addFriendToGroup', { 'groupName': groupName, 'userEmail': userEmail })
  }
  postAPIGroupRemove(groupName, userEmail) {
    console.log("Reached postAPIDataGroup with groupName: ", groupName)
    return this.httpClient.post(environment.fireStoreURL + '/removeFriendFromGroup', { 'groupName': groupName, 'userEmail': userEmail })
  }
  createGroup(groupName): Observable<Group> {
    return this.httpClient.post<Group>(environment.fireStoreURL + '/addGroup', { 'groupName': `${groupName}`, 'userEmail': `${DataService.getUserEmail()}` }, httpOptions)
  }
  getUser(userEmail: String) : Observable<User> {
    return this.httpClient.post<User>(environment.fireStoreURL + '/getUser', { 'userEmail': `${userEmail}` }, httpOptions)
  }
  getUsers() : Observable<Array<String>> {
    return this.httpClient.post<Array<String>>(environment.fireStoreURL + '/getUsers', { 'userEmail': 'rkoripalli1@gmail.com'}, httpOptions)
  }
  updateUser() {
    return this.httpClient.post(environment.fireStoreURL + '/updateInfo', { 'userEmail': `${DataService.getUserEmail()}`, 'userAge': `${DataService.getUserAge()}`, 'userHeight': `${DataService.getUserHeight()}`, 'userWeight': `${DataService.getUserWeight()}`, 'userGroup': `${DataService.getUserGroup()}` })
  }
  getGroup(groupName: String) : Observable<Group> {
    return this.httpClient.post<Group>(environment.fireStoreURL + '/getGroup', { 'groupName': `${groupName}` }, httpOptions)
  }
}