import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseResultService {

  constructor(private httpClient: HttpClient) { }
  postSubmitReps(exercise: string, challenge: string, reps: string, email: string) {
    let challengeParams = {exercise: exercise, challenge: challenge, reps: reps, email: email};
    return this.httpClient.post(environment.fireStoreURL+'/updateChallengeResults', challengeParams);
  }
}
