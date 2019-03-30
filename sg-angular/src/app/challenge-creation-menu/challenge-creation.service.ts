import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChallengeCreationService {

  constructor(private httpClient : HttpClient) { }
  postAPIdata(challengeData){
    console.log(challengeData);
    return this.httpClient.post('http://localhost:8080/addChallenge', challengeData);
  }
//{'exercises' : `${challengeData[0]}`, 'reps' : `${challengeData[1]}`}
}
