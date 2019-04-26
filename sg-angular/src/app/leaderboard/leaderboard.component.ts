import {Component, OnInit, ViewChild} from '@angular/core';
import {GroupService} from "../services/group.service";
import {forEach} from "@angular/router/src/utils/collection";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material";
import {ResultsService} from "../services/results.service";
import {UserService} from "../services/user.service";

export interface groupLeaderboardElement {
  userName: string;
  score: string;
}

export interface globalLeaderboardElement {
  userName: string;
  group: string;
  score: string;
}

var GROUP_DATA: groupLeaderboardElement[] = [];
var GLOBAL_DATA: globalLeaderboardElement[] = [];


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  dataSourceGroup = new MatTableDataSource(GROUP_DATA);
  dataSourceGlobal = new MatTableDataSource(GLOBAL_DATA);
  displayedColumnsGroup = ['userName', 'score'];
  displayedColumnsGlobal= ['userName', 'group', 'score'];
  //scores: number[];

  constructor(
    private groupService: GroupService,
    private resultsService: ResultsService,
    private userService: UserService
  ) {  }

  ngOnInit() {


      this.resultsService.getResultScores(this.userService.getUserGroup()).subscribe((res) =>{
        GROUP_DATA.splice(0, GROUP_DATA.length);
        let groupMembers = this.groupService.getGroupMembers();
        let listOfUserScores = [];

        let addedScores: number[] = [];
        addedScores.length = this.groupService.getGroupMembers().length;
        addedScores.fill(0);

        for (let exercise of res[0]){
          let currentExercise = exercise.exerciseName;
          let regExp = /\{([^)]+)\}/;
          let expectedResult = regExp.exec(String(currentExercise));
          let currRepsTargeted = (expectedResult != null && expectedResult[1] != null) ? +expectedResult[1] : 0;

          let index = 0;
          //console.log("e", exercise);
          for (let results of exercise.userObj){
            //console.log("r", results);
            let result = regExp.exec(results);
            //console.log("re", result);
            let currUserScore = 0;
            if(result != null && +result[1] != null){
              currUserScore = +result[1];
              //console.log(result[1]);
              //addedScores[index] = addedScores[index] + +result[1];

            }
            listOfUserScores.push(this.getScoreBasedOnReps(currRepsTargeted, currUserScore));
          }

        }
        console.log(listOfUserScores);

        let numberUsers = this.groupService.getGroupMembers().length;
        let index = 0;
        for (let score in listOfUserScores){
          addedScores[index%numberUsers] = addedScores[index%numberUsers] + +score;
          index++;
        }

        /*for (let user of groupMembers) {
          GROUP_DATA.push({userName: user, score: String((Math.random() * 100).toFixed())});
        }
        GROUP_DATA.sort(function (a, b) {
          return <any>b.score - <any>a.score;
        });*/

        for (let i = 0; i < groupMembers.length; i++){
          GROUP_DATA.push({userName: groupMembers[i], score: String(addedScores[i])});
        }
        GROUP_DATA.sort(function (a, b) {
          return <any>b.score - <any>a.score;
        });

      });






    this.userService.getAllUsers().subscribe((res) => {
      let allUsers = res as Array<any>;
      //console.log(allUsers);
      //console.log(GLOBAL_DATA);
      GLOBAL_DATA.splice(0, GLOBAL_DATA.length);
      for (let user of allUsers){
        GLOBAL_DATA.push({userName: user.email, group: user.groupID, score: String((Math.random() * 100).toFixed())})
      }
      GLOBAL_DATA.sort(function (a, b) {
        return <any>b.score - <any>a.score;
      });
    });

  }


  getScoreBasedOnReps(expected, completed) {
    var expectedInt = +expected; // y: number
    var completedInt = +completed;

    return ((completedInt / expectedInt) * 10);

  }



}
