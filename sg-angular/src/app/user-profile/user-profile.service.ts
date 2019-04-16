import { HttpClient } from '@angular/common/http';
import { DataService } from './../../services/data.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Group } from './group'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../services/user'
import { UserService } from 'src/services/user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private httpClient: HttpClient, private userService: UserService) { }

  postAPIGroupAdd(groupName, userEmail) {
    console.log("Reached postAPIDataGroup with groupName: ", groupName)
    return this.httpClient.post(environment.fireStoreURL + '/addFriendToGroup', { 'groupName': groupName, 'userEmail': userEmail })
  }
  postAPIGroupRemove(groupName, userEmail) {
    console.log("Reached postAPIDataGroup with groupName: ", groupName)
    return this.httpClient.post(environment.fireStoreURL + '/removeFriendFromGroup', { 'groupName': groupName, 'userEmail': userEmail })
  }
  createGroup(groupName): Observable<Group> {
    return this.httpClient.post<Group>(environment.fireStoreURL + '/addGroup', { 'groupName': `${groupName}`, 'userEmail': `${this.userService.getUserEmail()}` }, httpOptions)
  }
  getGroup(groupName: String) : Observable<Group> {
    return this.httpClient.post<Group>(environment.fireStoreURL + '/getGroup', { 'groupName': `${groupName}` }, httpOptions)
  }
}