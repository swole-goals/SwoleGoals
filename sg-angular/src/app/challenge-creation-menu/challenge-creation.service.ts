import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Challenge} from './challenge';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ChallengeCreationService {

  constructor(private httpClient : HttpClient) { }
  postAPIdata(challengeData){
    console.log(challengeData);
    return this.httpClient.post(environment.fireStoreURL+'/addChallenge', challengeData);
  }

  // updateInGroup(cname, gname): Observable<Challenge>{
  //   console.log(cname, gname);
  //   return this.httpClient.post<Challenge>(environment.fireStoreURL+'/addClgtoGroup', { 'cname': `${cname}`, 'gname': `${gname}`}, httpOptions);
  // }
//{'exercises' : `${challengeData[0]}`, 'reps' : `${challengeData[1]}`}
}