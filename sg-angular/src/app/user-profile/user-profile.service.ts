import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

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

}