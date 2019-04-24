import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { ExerciseInfo } from '../exercise-list/exerciseinfo';
import { ChallengeInfo } from './challengeinfo';
import { ExerciseReps } from './exercisereps';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]  
})
export class MapComponent implements OnInit {

	public exercisesList: Array<ExerciseInfo>;
	public exerciseAbout: string = "Click a tile to learn more";
	public challenge: ChallengeInfo;
	public reps: Array<ExerciseReps> = [];
	public userEmail: string = '';
	constructor(private exerciseService: MapService, private userService: UserService) {

  	}

 	aboutExercise(index: number) {
		this.exerciseAbout = "Muscles: " + this.exercisesList[index].muscles;
	}
	
	performExercise(name: string) {
		window.location.href = '/app-exercise-current/' + this.challenge.challengeName + '/' + name;		
	}
	
  	ngOnInit() {
        	this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
                	this.exercisesList = res;
		});
		this.userEmail = this.userService.getUserEmail();
		console.log(this.userEmail);
		if(!this.userEmail)
			this.userEmail = "rkoripalli@utexas.edu";
		this.exerciseService.getChallenge(this.userEmail).subscribe(res => {
			this.challenge = new ChallengeInfo();
			this.challenge.challengeName = (res as ChallengeInfo).challengeName;
			this.challenge.exercises = (res as ChallengeInfo).exercises;
			for(let exercise of this.challenge.exercises) {
				let nameBegin = exercise.indexOf('[') + 1;
				let nameEnd = exercise.indexOf(']');
				let repsBegin = exercise.indexOf('{') + 1;
				let repsEnd = exercise.indexOf('}');
				let n = exercise.substring(nameBegin, nameEnd);
				let r = exercise.substring(nameBegin, nameEnd);
				let er = new ExerciseReps();
				er.name = n;
				er.reps = r;
				this.reps.push(er);
			}
		});
  	}

}

