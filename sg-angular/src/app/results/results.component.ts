import { Component, OnInit } from '@angular/core';
import { ResultsService } from './results.service';
import { DataService } from '../../services/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Challenge, Group, UserObj, ResultObj, DocData, UserResultObj } from "./results.classes";
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';
import { ChallengeService } from 'src/services/challenge.service';
import { GroupService } from 'src/services/group.service';
import { UserService } from 'src/services/user.service';

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
  userResultArr: Array<string>; /* Unique variable to this function passed to update firestore. */

  constructor(
    private challengeService: ChallengeService, 
    private groupService: GroupService,
    private userService: UserService,
    private dataService : DataService, private resultsService : ResultsService, private httpClient : HttpClient) {
    //var userData = this.dataService.getUserData();
  }

  ngOnInit() {
    // this.userData = this.dataService.getUserData();
    // console.log("userprofile:", this.dataService.getUserData());
    // this.userName = this.dataService.getUserName();
    // this.userEmail = this.dataService.getUserEmail();
    // this.age = this.dataService.getUserAge();
    // this.height = this.dataService.getUserHeight();
    // this.weight = this.dataService.getUserWeight();
    // this.image = this.dataService.getUserImage();
    //this.groupUsers = this.dataService.getGroupMembers;

    /* Need groupID, userEmail, and challengeName to update Challenge Results. */
    //this.groupName = this.dataService.getUserGroup();
    //this.challengeName = this.dataService.getChallengeData;
    this.userResultArr = [];
  }

  /* Create a ChallengeResult Object to contain user results. Must be called ONCE for the GameMap. */
  createChallengeResultObject() {
    //TODO: Replace this with grabbing challenge and groupID from DataService.
    //this.challengeName = "Challenge21";
    //this.groupName = "ResultChallengeTestGroup";
    this.challengeService.getChallengeData().subscribe(res => {
      this.challengeName = res.challengeName;
      this.groupName = this.userService.getUserGroup();
      console.log("CHALLENGE NAME: ", this.challengeName);
      console.log("GROUPNAME: ", this.groupName);  

      this.httpClient.post<Challenge>(environment.fireStoreURL+'/getChallengeExerciseList', 
    {
      'challengeName':res.challengeName, 
    }).subscribe((response)=>{
      console.log('response from getChallengeExerciseList ', response);
      this.exerciseList = response.exercises;
      console.log("this resp.exList: ", response.exercises);
      this.httpClient.post<Group>(environment.fireStoreURL+'/getGroupUsers',
      {
        'groupName':this.groupName, 
      }).subscribe((response)=>{
        console.log('response from getGroupUsers ', response);
        this.groupUsers = response.users;
        console.log("this resp.groupUsers: ", response.users);

          /* This internal array keeps track of user's results! */
        for (let j = 0; j<this.exerciseList.length;j++) {
          for (let i = 0; i<this.groupUsers.length;i++) {
            this.userResultArr.push(this.groupUsers[i]);
          }
        }

        console.log("USER RESULT ARRAY AFTER INIT", this.userResultArr);
      
        this.postChallengeResults();

      },(error)=>{
        console.log('error during getGroupUsers ', error)
      })

    },(error)=>{
      console.log('error during getChallengeExerciseList ', error)
    })  

    })
   

    console.log("USER RESULT ARRAY AFTER INIT", this.userResultArr);

  }

  

  /* Update User's Result for specific Exercise. */
  updateChallengeResultsUserExercise(exerciseName: string, results: string) {
    exerciseName = "[Bodyweight Flyes]{8}";
    results = '5555';
    var userToUpdate = "fakeuser@gmail.com";

    //TODO: Replace this with grabbing challenge and groupID from DataService.
  
    this.challengeService.getChallengeData().subscribe(res => {
      this.challengeName = res.challengeName;
      this.groupName = this.userService.getUserGroup();
      console.log("CHALLENGE NAME: ", this.challengeName);
      console.log("GROUPNAME: ", this.groupName);  
      this.userResultArr = [];


      this.httpClient.post<Challenge>(environment.fireStoreURL+'/getChallengeExerciseList', 
      {
        'challengeName':this.challengeName, 
      }).subscribe((response)=>{
        //console.log('response from getChallengeExerciseList ', response);
        this.exerciseList = response.exercises;
        //console.log("this exList: ", this.exerciseList);
        //console.log("this resp.exList: ", response.exercises);
        
        this.httpClient.post<Group>(environment.fireStoreURL+'/getGroupUsers',
        {
          'groupName':this.groupName, 
        }).subscribe((response)=>{
          //console.log('response from getGroupUsers ', response);
          this.groupUsers = response.users;
          //console.log("this groupUsers: ", this.groupUsers);
          //console.log("this resp.groupUsers: ", response.users);

          /* Get current state from firestore. */

          console.log(this.groupName);
          console.log(this.challengeName);
          console.log(this.userEmail);
          console.log(this.results);
          console.log(this.exerciseList);
          console.log(this.groupUsers);

          this.httpClient.post<ResultObj>(environment.fireStoreURL+'/updateChallengeResults', 
          {
              'groupName':this.groupName,
              'groupUsers':this.groupUsers,
              'challengeName':this.challengeName, 
              'exerciseName':this.exerciseName, 
              'userEmail':this.userEmail,
              'results':this.results,
              'exerciseList':this.exerciseList,
              'userResultArr':this.userResultArr
          }).subscribe((response)=>{
            // console.log('CURRENT STATE BEFORE UPDATE IS: ', response);
            // console.log('RESPONSE groupID: ', response.groupID);
            // console.log('RESPONSE challengeName: ', response.challengeName);
            // console.log('RESPONSE ResultList: ', response.resultList);
            this.userResultArr = [];

            
            for (let i = 0; i < response.resultList.length; i++) {
              var currExercise = response.resultList[i].exerciseName;
              //console.log("RESPONSE ResultObj", response.resultList[i]);
              //console.log("RESULT OBJ EXNAME", response.resultList[i].exerciseName);
              for (let u = 0; u < response.resultList[i].userObj.length; u++) {
                var currUserResult = response.resultList[i].userObj[u];
                console.log("CURR USER RESULT", currUserResult);
                if (currExercise === exerciseName
                  && currUserResult === userToUpdate) {
                    console.log("FOUND MATCHING EXERCISE.");
                    console.log("FOUND MATCHING USER.");
                    console.log("RESULTS SHOULD BE: ", results);
                    this.userResultArr.push(currUserResult + "{" + <string>results + "}");
                    //console.log(currUserResult + "{" + <string>results + "}");
                  } else {
                  this.userResultArr.push(currUserResult);
                  //console.log(currUserResult);
                } 
              }
            }

            console.log("UPDATED USER RESULT ARRAY :", this.userResultArr);
            /* Post updated result. Firestore should use userResultArr to create new docData. */
            this.postChallengeResults();

          },(error)=>{
            console.log('error during updateChallengeResults ', error)
          })
          
        },(error)=>{
          console.log('error during getGroupUsers ', error)
        })

    },(error)=>{
      console.log('error during getChallengeExerciseList ', error)
    })

    })


    
     
  }

  /* POST ChallengeResults Object to firestore server. */
  postChallengeResults() {
    /* TODO: Remove below to test grabbing info from DataService */
    this.userEmail = "testUserEmail";
    this.results = "testResults";

    /* TODO: Make sure initialization has same group name as the group name belonging to user! */

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
        'userResultArr':this.userResultArr
    }).subscribe((response)=>{
      console.log('response from updateChallengeResults ', response);
    },(error)=>{
      console.log('error during updateChallengeResults ', error)
    })
  }

  getScoreBasedOnReps(expected: string, completed: string) {
    var expectedInt = +expected; // y: number
    var completedInt = +completed;

    return ((completedInt / expectedInt) * 10);

  }

  getListOfUserScores() {
    var listOfUserScores = [];

    /* TODO: Make sure initialization has same group name as the group name belonging to user! */
    this.challengeName = "Challenge21";
    this.groupName = "ResultChallengeTestGroup";

    console.log(this.groupName);
    console.log(this.challengeName);
    console.log(this.userEmail);
    console.log(this.results);
    console.log(this.exerciseList);
    console.log(this.groupUsers);

    this.httpClient.post<Challenge>(environment.fireStoreURL+'/getChallengeExerciseList', 
    {
      'challengeName':this.challengeName, 
    }).subscribe((response)=>{
      //console.log('response from getChallengeExerciseList ', response);
      this.exerciseList = response.exercises;
      //console.log("this exList: ", this.exerciseList);
      //console.log("this resp.exList: ", response.exercises);
      
      this.httpClient.post<Group>(environment.fireStoreURL+'/getGroupUsers',
      {
        'groupName':this.groupName, 
      }).subscribe((response)=>{
        //console.log('response from getGroupUsers ', response);
        this.groupUsers = response.users;
        //console.log("this groupUsers: ", this.groupUsers);
        //console.log("this resp.groupUsers: ", response.users);

        /* Get current state from firestore. */

        console.log(this.groupName);
        console.log(this.challengeName);
        console.log(this.userEmail);
        console.log(this.results);
        console.log(this.exerciseList);
        console.log(this.groupUsers);

        this.httpClient.post<ResultObj>(environment.fireStoreURL+'/updateChallengeResults', 
        {
            'groupName':this.groupName,
            'groupUsers':this.groupUsers,
            'challengeName':this.challengeName, 
            'exerciseName':this.exerciseName, 
            'userEmail':this.userEmail,
            'results':this.results,
            'exerciseList':this.exerciseList,
            'userResultArr':this.userResultArr
        }).subscribe((response)=>{
          for (let i = 0; i < response.resultList.length; i++) {
            var currExercise = response.resultList[i].exerciseName;

            let str = currExercise;

            let result = str.match( /{\w+}/i );

            var currRepsTargeted = (result != null && result[0] != null) ? +result[0] : 0;
            console.log("TARGET REPS OUTSIDE: ", currRepsTargeted);

            for (let u = 0; u < response.resultList[i].userObj.length; u++) {
              var currUserResult = response.resultList[i].userObj[u];
              let currUserScore = 0;
              let str = currUserResult;

              let result = str.match( /{\w+}/i );

              if (result != null && result[0] != null) {
                console.log( result[0] );    
                currUserScore = result[0];
                console.log("FOUND USER REPS COMPLETED: ", currUserScore);
                console.log("TARGETED REPS IS: ", currRepsTargeted);
              }


              /* TODO: Get score for current user. 
                Call getScoreBasedOnReps(expected: string, completed: string) 
                and push to var listOfUserScores = [];*/
              
              
            }
          }

        },(error)=>{
          console.log('error during updateChallengeResults ', error)
        })
        
      },(error)=>{
        console.log('error during getGroupUsers ', error)
      })

    },(error)=>{
      console.log('error during getChallengeExerciseList ', error)
    })
  }
}
