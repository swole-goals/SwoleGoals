import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetChallengesService {

  constructor(private httpClient : HttpClient) { }
  getAPIdata(){
    return this.httpClient.get(environment.fireStoreURL+'/getChallenges');
  }
}
