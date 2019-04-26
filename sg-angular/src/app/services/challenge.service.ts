import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }
  
  getChallengeData(): Observable<any> {
  	return this.httpClient.get<any>(environment.fireStoreURL+`/getCurrentChallenge/`+this.userService.getUserEmail());
  }

  postChallengedata(challengeData){
    console.log(challengeData);
    return this.httpClient.post(environment.fireStoreURL+'/addChallenge', challengeData);
  }

  getAPIdata(){
    return this.httpClient.get(environment.fireStoreURL+'/getChallenges');
  }

  postGroupChallengedata(groupAndChallenge){// [0]: group, [1]: challenge
    console.log(groupAndChallenge);
    return this.httpClient.post(environment.fireStoreURL+'/setGroupChallenge', {'group' : `${groupAndChallenge[0]}`,
      'challenge' : `${groupAndChallenge[1]}`});
  }
}