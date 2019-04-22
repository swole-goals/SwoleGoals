import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { ExerciseInfo } from '../exercise-list/exerciseinfo';
import { ChallengeInfo } from './challengeinfo';
import { ExerciseReps } from './exercisereps';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { ResultsService } from '../results/results.service';
import { ResultObj } from '../results/results.classes';

@Component({
  selector: 'ng-if',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]  
`
})
export class NgIf {
	exist: boolean;
	exist = true;
	constructor(){
		if(this.exerciseList.current != null){
		exist = true;
		}else {exist = false;}
	}
 
}