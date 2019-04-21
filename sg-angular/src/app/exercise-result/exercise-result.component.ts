import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultsService } from '../results/results.service';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.css']
})
export class ExerciseResultComponent implements OnInit {
  public repsTotal = 20;
  public userEmail: string = '';
  public groupName: string = '';
  public challenge: string = '';
  public name: string = '';
  public unformattedName: string = '';
  constructor(private userService : UserService, private router: Router, private resultsComponent: ResultsService, private activatedRoute: ActivatedRoute, private mapService: MapService) { }
  increaseReps() { 
  	this.repsTotal++;
  }
  decreaseReps() { 
  	this.repsTotal--;
  }
  submitReps() {
  	console.log(String(this.repsTotal));
  	this.resultsComponent.updateChallengeResultsUserExercise(this.unformattedName, String(this.repsTotal), this.userEmail)
  	this.router.navigate(['/app-map']);
  }
  ngOnInit() {
	this.userEmail = this.userService.getUserEmail();
	this.groupName = this.userService.getUserGroup();
	this.challenge = this.activatedRoute.snapshot.paramMap.get('challenge');
	this.name = this.activatedRoute.snapshot.paramMap.get('exercise');
	this.mapService.getChallenge(this.userEmail).subscribe(res => {
		let exercises = res as Array<string>;
		for(let exercise of exercises) {
        		let nameBegin = exercise.indexOf('[') + 1;
			let nameEnd = exercise.indexOf(']');
			let n = exercise.substring(nameBegin, nameEnd);
			if(this.name == n) {
				this.unformattedName = exercise;
			}
		}
	});
  }

}
