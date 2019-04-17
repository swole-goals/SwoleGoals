import { Component, OnInit } from '@angular/core';
import { ResultsService } from './results.service';
import { DataService } from '../../services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Challenge, Group } from "./results.classes";
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  userData;
  groupInfo;
  groupName;
  userEmail;
  userName;
  image;
  age;
  weight;
  height;
  exerciseList : Array<string>;

  // Variables for updating Results Object
  groupUsers : Array<string>; /* TODO: Grab from firestore on first instant. */
  challengeName; /* TODO: Grab from firestore on first instant. 
   Populate ResultsExercise array. */

  results; /* Updated by user through frontend! */
  exerciseName; /* TODO: Grab the exerciseName from the Challenges Collections during GameMap. */

  constructor(private dataService : DataService, private resultsService : ResultsService, private httpClient : HttpClient) {
    var userData = this.dataService.getUserData();
  }

  ngOnInit() {
    this.userData = this.dataService.getUserData();
    console.log("userprofile:", this.dataService.getUserData());
    this.userName = this.dataService.getUserName();
    this.userEmail = this.dataService.getUserEmail();
    this.age = this.dataService.getUserAge();
    this.height = this.dataService.getUserHeight();
    this.weight = this.dataService.getUserWeight();
    this.image = this.dataService.getUserImage();
    //this.groupUsers = this.dataService.getGroupMembers;

    /* Need groupID, userEmail, and challengeName to update Challenge Results. */
    this.groupName = this.dataService.getUserGroup();
    this.challengeName = this.dataService.getChallengeData;
  }

  createChallengeResultObject() {

    /* Set class exerciseList variable. */
    this.getChallengeExerciseList();
    //this.getGroupUsers();

  }

  getChallengeExerciseList() {
    this.challengeName = "Challenge20";
    this.groupName = "ResultTestGroup";

    this.httpClient.post<Challenge>(environment.fireStoreURL+'/getChallengeExerciseList', 
    {
      'challengeName':this.challengeName, 
    }).subscribe((response)=>{
      console.log('response from getChallengeExerciseList ', response);
      this.exerciseList = response.exercises;
      console.log("this exList: ", this.exerciseList);
      console.log("this resp.exList: ", response.exercises);
      
      this.httpClient.post<Group>(environment.fireStoreURL+'/getGroupUsers',
      {
        'groupName':this.groupName, 
      }).subscribe((response)=>{
        console.log('response from getGroupUsers ', response);
        this.groupUsers = response.users;
        console.log("this groupUsers: ", this.groupUsers);
        console.log("this resp.groupUsers: ", response.users);
        this.postChallengeResults();
      },(error)=>{
        console.log('error during getGroupUsers ', error)
      })

    },(error)=>{
      console.log('error during getChallengeExerciseList ', error)
    })
    
  }

  getGroupUsers() {
    this.groupName = "ResultTestGroup";
    this.httpClient.post<Group>(environment.fireStoreURL+'/getGroupUsers',
    {
      'groupName':this.groupName, 
    }).subscribe((response)=>{
      console.log('response from getGroupUsers ', response);
      this.groupUsers = response.users;
      console.log("this groupUsers: ", this.groupUsers);
      console.log("this resp.groupUsers: ", response.users);
      this.postChallengeResults();
    },(error)=>{
      console.log('error during getGroupUsers ', error)
    })
    
  }

  /* Update User's Result for specific Exercise. */
  updateChallengeResultsUserExercise(exerciseName: string, results: string) {
    this.exerciseName = "[Rope Climb]{8}";
    this.results = 123456789;
    this.postChallengeResults();
  }

  /* POST ChallengeResults Object to firestore server. */
  postChallengeResults() {
    /* TODO: Remove below to test grabbing info from DataService */
    this.groupName = "testGroupID15";
    this.challengeName = "testChallengeName";
    this.userEmail = "testUserEmail";
    this.results = "testResults";

    console.log(this.groupName);
    console.log(this.challengeName);
    console.log(this.userEmail);
    console.log(this.results);
    console.log(this.exerciseList);
    console.log(this.groupUsers);

    this.httpClient.post(environment.fireStoreURL+'/updateChallengeResults', 
    {
        'groupName':this.groupName,
        'groupUsers':this.groupUsers,
        'challengeName':this.challengeName, 
        'exerciseName':this.exerciseName, 
        'userEmail':this.userEmail,
        'results':this.results,
        'exerciseList':this.exerciseList,
    }).subscribe((response)=>{
      console.log('response from updateChallengeResults ', response);
    },(error)=>{
      console.log('error during updateChallengeResults ', error)
    })
  }
}

