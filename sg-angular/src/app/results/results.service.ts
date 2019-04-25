import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ChallengeService } from '../services/challenge.service';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';
import { Challenge, Group, UserObj, ResultObj, DocData, UserResultObj } from "./results.classes";

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  groupName;
  userEmail;
  exerciseList : Array<string>;
  userResultArr: Array<string>; /* Unique variable to this function passed to update firestore. */
  results; /* Updated by user through frontend! */
  exerciseName; /* TODO: Grab the exerciseName from the Challenges Collections during GameMap. */
  groupUsers : Array<string>; /* TODO: Grab from firestore on first instant. */
  challengeName; /* TODO: Grab from firestore on first instant.
   Populate ResultsExercise array. */ 
constructor(
		private httpClient : HttpClient,
	 	private challengeService: ChallengeService,
    		private groupService: GroupService,
    		private userService: UserService
	) { }

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

    //needed to be moved so people can call this outside of the component  
  getChallengeResultObject(groupName: string) {
    return this.httpClient.post<ResultObj>(environment.fireStoreURL+'/getResultObj',
    {
      'groupName':groupName
    })
  }

  getResultScores(groupName: string) {
    return this.httpClient.post<ResultObj>(environment.fireStoreURL+'/getResultScores',
      {
        'groupName':groupName
      })
  }

  /* Update User's Result for specific Exercise. */
  updateChallengeResultsUserExercise(exerciseName: string, results: string, userToUpdate: string) {
   /* exerciseName = "[Incline Cable Flye]{8}";
    results = '1234';
    var userToUpdate = "user3@gmail.com";
  */
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
	  this.userEmail = userToUpdate;
	  this.results = results;
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
    //this.userEmail = "testUserEmail";
    //this.results = "testResults";

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

        this.userResultArr = [];
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

  public getListOfUserScores():Array<number> {
    var listOfUserScores = new Array<number>();
    var max = 0;

    /* TODO: Make sure initialization has same group name as the group name belonging to user! */
    this.challengeName = this.groupService.getGroupChallenge();
    this.groupName = this.userService.getUserGroup();

    /*console.log(this.groupName);
    console.log(this.challengeName);
    console.log(this.userEmail);
    console.log(this.results);
    console.log(this.exerciseList);
    console.log(this.groupUsers);*/

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

        /*console.log(this.groupName);
        console.log(this.challengeName);
        console.log(this.userEmail);
        console.log(this.results);
        console.log(this.exerciseList);
        console.log(this.groupUsers);*/

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

            //console.log('current', currExercise);

            let regExp = /\{([^)]+)\}/;
            let expectedResult = regExp.exec(String(str));

            // result[1] contains the parsed string
            var currRepsTargeted = (expectedResult != null && expectedResult[1] != null) ? +expectedResult[1] : 0;
            //console.log("TARGET REPS OUTSIDE: ", currRepsTargeted);

            for (let u = 0; u < response.resultList[i].userObj.length; u++) {
              var currUserResult = response.resultList[i].userObj[u];
              let currUserScore = 0;
              let str = currUserResult;

              let regExp = /\{([^)]+)\}/;
              let result = regExp.exec(str);


              if (result != null && result[1] != null) {
                //console.log("inner result", result[1] );
                currUserScore = +result[1];
               // console.log("FOUND USER REPS COMPLETED: ", currUserScore);
                //console.log("TARGETED REPS IS: ", currRepsTargeted);
              }


              /* TODO: Get score for current user.

                Call getScoreBasedOnReps(expected: string, completed: string)
                and push to var listOfUserScores = [];*/

              listOfUserScores.push(this.getScoreBasedOnReps(currRepsTargeted, currUserScore))
              //listOfUserScores[u] += +this.getScoreBasedOnReps(currRepsTargeted, currUserScore);

              max = Math.max(max, listOfUserScores.length);





            }
            //console.log("XXXXX", listOfUserScores);
            //console.log("??????", listOfUserScores.length);
          }

          //console.log(listOfUserScores);

          // listOfUserScores;

          console.log("xxxx", max);

        },(error)=>{
          console.log('error during updateChallengeResults ', error)
        })

      },(error)=>{
        console.log('error during getGroupUsers ', error)
      })

    },(error)=>{
      console.log('error during getChallengeExerciseList ', error)
    })


    return listOfUserScores

    //return listOfUserScores;

  }

  getScoreBasedOnReps(expected, completed) {
    var expectedInt = +expected; // y: number
    var completedInt = +completed;

    return ((completedInt / expectedInt) * 10);

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
