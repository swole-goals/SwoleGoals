import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SetGroupChallengeService {

  constructor(private httpClient : HttpClient) { }
  postAPIdata(groupAndChallenge){// [0]: group, [1]: challenge
    console.log(groupAndChallenge);
    return this.httpClient.post(environment.fireStoreURL+'/setGroupChallenge', {'group' : `${groupAndChallenge[0]}`,
      'challenge' : `${groupAndChallenge[1]}`});
  }
}