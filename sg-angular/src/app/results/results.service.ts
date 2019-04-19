import { HttpClient } from '@angular/common/http';
import { DataService } from './../../services/data.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  constructor(private httpClient : HttpClient) { }

  //TODO: Write Firestore server code to support functions below. 

  /* Set GroupID (String groupID) for Challenge. */
  public setChallengeGroupID(challengeName : string, groupID : string) {
    this.httpClient.post(environment.fireStoreURL+'/setChallengeGroupID', 
    {
      'challengeName':challengeName, 
      'groupID':groupID
    }).subscribe((response)=>{
      console.log('response from setChallengeGroupID ', response);
    },(error)=>{
      console.log('error during setChallengeGroupID ', error)
    })
  }

  /* Set TargetedReps (Number targetedReps) for specific Exercise (String exerciseName) in Challenge. */
  public setChallengeExerciseTargetedReps(challengeName : string, exerciseName: string, targetedReps: number) {
    this.httpClient.post(environment.fireStoreURL+'/setChallengeExerciseTargetedReps', 
      {
        'challengeName':challengeName, 
        'exerciseName':exerciseName, 
        'targetedReps':targetedReps
      }).subscribe((response)=>{
      console.log('response from setChallengeExerciseTargetedReps ', response);
    },(error)=>{
      console.log('error during setChallengeExerciseTargetedReps ', error)
    })
  }

  /*
    Gets entire array of Exercises for the Challenge. 
    Each Exercise contains:
      1) Targeted number of reps. 
      2) Users Array of Key, Value where:
        1) Key: User (String email)
        2) Value: Reps (Number reps) 
        
    Note: Reps is updated for each User with function 'setChallengeExerciseUserReps').
  */
  public getChallengeExercisesArray(challengeName : string) {
  
    this.httpClient.post(environment.fireStoreURL+'/getChallengeExercisesArray', 
    {
      'challengeName':challengeName
    }).subscribe((response)=>{
      console.log('response from getChallengeExercisesArray ', response);
    },(error)=>{
      console.log('error during getChallengeExercisesArray ', error)
    })
    
  }

  /*
    Gets entire array of PointsAwarded for the Challenge.
    PointsAwarded contains all Exercises. 
    Each Exercise (String exerciseName) contains:
      1) Users Array of Key, Value where:
        1) Key: User (String email)
        2) Value: Points (Number points) 
        
    Note: Points are calculated with the PointScoringAlgorithm based on the Reps completed by each User for each Exercise.
  */
  public getChallengePointsAwardedArray(challengeName : string) {
    this.httpClient.post(environment.fireStoreURL+'/getChallengePointsAwardedArray', 
    {
      'challengeName':challengeName
    }).subscribe((response)=>{
      console.log('response from getChallengePointsAwardedArray ', response);
    },(error)=>{
      console.log('error during getChallengePointsAwardedArray ', error)
    })
  }

  /*
    Sets the Reps (Number reps) completed by a specific User (String email) for a specific Exercise (String exerciseName). 
    This updates ExercisesArray.
  */
  public setChallengeExerciseUserReps (challengeName : string, userEmail : string, exerciseName : string, reps : number) {
    this.httpClient.post(environment.fireStoreURL+'/setChallengeExerciseUserReps', 
    {
      'challengeName':challengeName, 
      'userEmail' : userEmail, 
      'exercise' : exerciseName, 
      'reps': reps
    }).subscribe((response)=>{
      console.log('response from setChallengeExerciseUserReps ', response);
    },(error)=>{
      console.log('error during setChallengeExerciseUserReps ', error)
    })
  }  

  /*
    Sets Points (Number points) awarded to a User (String email) for a specific Exercise (String exerciseName).
    This updates PointsAwardedArray.
  */
 public setChallengePointsAwardedArrayExerciseUser(challengeName : string, userEmail : string, exerciseName : string, points : number) {
  this.httpClient.post(environment.fireStoreURL+'/setChallengePointsAwardedArrayExerciseUser', 
  {
    'challengeName':challengeName, 
    'userEmail' : userEmail,
    'exercise' : exerciseName, 
    'points': points
  }).subscribe((response)=>{
    console.log('response from setChallengePointsAwardedArrayExerciseUser ', response);
  },(error)=>{
    console.log('error during setChallengePointsAwardedArrayExerciseUser ', error)
  })
 }

}
