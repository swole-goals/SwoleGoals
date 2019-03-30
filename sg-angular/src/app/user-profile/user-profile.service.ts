import { HttpClient } from '@angular/common/http';
import { DataService } from './../../services/data.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  userEmail
  constructor(private dataService: DataService, private httpClient: HttpClient) { }

  createGroup(groupName) {
    this.userEmail = this.dataService.getUserEmail();
    console.log("Creating new group: ", groupName);
    return this.httpClient.post(environment.fireStoreURL+'/addGroup', { 'groupName': `${groupName}`, 'userEmail': `${this.userEmail}` })
  }
  updateInfo(userAge,userHeight,userWeight) {
    this.userEmail = this.dataService.getUserEmail();
    console.log(environment.fireStoreURL);
    return this.httpClient.post(environment.fireStoreURL+'/updateInfo', { 'userEmail': `${this.userEmail}`, 'userAge': `${userAge}`, 'userHeight': `${userHeight}`, 'userWeight': `${userWeight}` })
  }
}