import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultsService } from '../services/results.service';
import { ChallengeService } from '../services/challenge.service';
import { MapService } from '../map/map.service';
import { ChallengeInfo } from '../map/challengeinfo';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.css']
})

export class ExerciseResultComponent implements OnInit {
  public repsTotal = 20;
  public baseReps = 20;
  public userEmail: string = '';
  public groupName: string = '';
  public challenge: string = '';
  public name: string = '';
  public unformattedName: string = '';

  constructor(private userService : UserService, private router: Router, private resultsComponent: ResultsService, private activatedRoute: ActivatedRoute, private challengeService: ChallengeService) { }
  
  increaseReps() {
    if(this.repsTotal < (this.baseReps * 2)) 
      this.repsTotal++;
  }
  
  decreaseReps() { 
    if(this.repsTotal > 0)
      this.repsTotal--;
  }
  
  submitReps() {
    this.resultsComponent.updateChallengeResultsUserExercise(this.unformattedName, String(this.repsTotal), this.userEmail)
    this.router.navigate(['/app-map']);
  }
  
  ngOnInit() {
    this.userEmail = this.userService.getUserEmail();
    this.groupName = this.userService.getUserGroup();
    this.challenge = this.activatedRoute.snapshot.paramMap.get('challenge');
    this.name = this.activatedRoute.snapshot.paramMap.get('exercise');
    this.challengeService.getChallengeData().subscribe(res => {
      let c = (res as ChallengeInfo);
      for(let exercise of c.exercises) {
        let nameBegin = exercise.indexOf('[') + 1;
	let nameEnd = exercise.indexOf(']');
	let repsBegin = exercise.indexOf('{') + 1;
	let repsEnd = exercise.indexOf('}');
	let n = exercise.substring(nameBegin, nameEnd);
	if(this.name == n) {
	  this.repsTotal = Number(exercise.substring(repsBegin, repsEnd));
	  this.baseReps = this.repsTotal;
	  this.unformattedName = exercise;
	}
      }
    });
  }

}
