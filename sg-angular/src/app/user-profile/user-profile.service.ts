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
    return this.httpClient.post('http://localhost:8080/addGroup', { 'groupName': `${groupName}`, 'userEmail': `${this.userEmail}` })
  }
}
