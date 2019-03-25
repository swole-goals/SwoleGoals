import { HttpClient } from '@angular/common/http';
import { DataService } from './../../services/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  message : {};
  constructor(private dataService : DataService, private httpClient : HttpClient) {}

  // postUserProfile(){
  //   return this.httpClient.post('http://localhost:8080/findUser', {'email' : this.message})
  // }
}
