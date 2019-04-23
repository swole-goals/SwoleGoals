import {Component, OnInit, ViewChild} from '@angular/core';
import {GroupService} from "../../services/group.service";
import {forEach} from "@angular/router/src/utils/collection";
import {HttpClient} from "@angular/common/http";
import {GetUsersService} from "../../services/get-users.service";
import {MatTableDataSource} from "@angular/material";
import {ResultsService} from "../results/results.service";

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
    private getUsersService: GetUsersService,
    private resultsService: ResultsService
  ) {  }

  ngOnInit() {
    let groupMembers = this.groupService.getGroupMembers();
      GROUP_DATA.splice(0, GROUP_DATA.length);


      console.log(this.resultsService.getChallengeResultObject(this.groupService.getGroupChallenge()));
      let scores = this.resultsService.getListOfUserScores();



      console.log(scores);
      console.log(scores.length);
      console.log(scores.toString());
      console.log(scores[0]);
      console.log(scores[1]);


      let addedScores = [];
      addedScores.length = groupMembers.length;
      let index = 0;
      //console.log(index);
      /*for (let score of scores){
        addedScores[(index)%groupMembers.length] += +score;
        console.log(index);
        index++
      }*/
      console.log('out');

      /*for(let i = 0; i < scores.length; i++){
        //console.log('in');
        addedScores[(i%groupMembers.length)] += +scores[i];
        //console.log(i%groupMembers.length);
        //console.log(i);
      }*/

      console.log(addedScores);


      for (let user of groupMembers) {
        GROUP_DATA.push({userName: user, score: String((Math.random() * 100).toFixed())});
      }
      GROUP_DATA.sort(function (a, b) {
        return <any>b.score - <any>a.score;
      });


    this.getUsersService.getAllUsers().subscribe((res) => {
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




}
