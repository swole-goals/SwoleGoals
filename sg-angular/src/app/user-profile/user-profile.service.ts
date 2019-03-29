import { HttpClient } from '@angular/common/http';
import { DataService } from './../../services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  userEmail
  constructor(private dataService: DataService, private httpClient: HttpClient) { }

  createGroup(groupName) {
    this.userEmail = this.dataService.getUserEmail();
    console.log("Creating new group", groupName)
    return this.httpClient.post('https://swolegoalsfirestore.appspot.com/addGroup', { 'groupName': `${groupName}`, 'userEmail': `${this.userEmail}` })
  }
  updateInfo(userAge,userHeight,userWeight) {
    this.userEmail = this.dataService.getUserEmail();
    return this.httpClient.post('https://swolegoalsfirestore.appspot.com/updateInfo', { 'userEmail': `${this.userEmail}`, 'userAge': `${userAge}`, 'userHeight': `${userHeight}`, 'userWeight': `${userWeight}` })
  }
}