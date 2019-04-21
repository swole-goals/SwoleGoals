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
	public groupName: string = '';
	public age: Number;
  	public height: Number;
  	public weight: Number;
	public results: ResultObj;
	
	constructor(private exerciseService: MapService, private userService: UserService, private router: Router
	, private resultsComponent: ResultsService
	) {

  	}

	initializeChallengeResultObject() {
		this.resultsComponent.createChallengeResultObject();
	}

 	aboutExercise(index: number) {
		this.exerciseAbout = "Muscles: " + this.exercisesList[index].muscles;
	}
	
	performExercise(name: string) {
		this.router.navigate(['/app-exercise-current/' + this.challenge.challengeName + '/' + name]);
	}
	
	getUserInfo() {
    		this.age = this.userService.getUserAge();
    		this.height = this.userService.getUserHeight();
    		this.weight = this.userService.getUserWeight();
    		if (this.userService.hasGroup()) {
			this.groupName = this.userService.getUserGroup();
			console.log(this.groupName);
    		}
  	}
  
		
  	ngOnInit() {
		this.getUserInfo();	
		/*
		this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
                	this.exercisesList = res;
		});
		*/
		this.resultsComponent.getChallengeResultObject(this.groupName).subscribe(res => {
			try {
				this.results = res;
				console.log(this.results);
			} catch {
				console.log('error getting results');
			}
		});
		
		this.userEmail = this.userService.getUserEmail();
		console.log(this.userEmail);
		//if(!this.userEmail)
		//	this.userEmail = "rkoripalli@utexas.edu";
		
		this.exerciseService.getChallenge(this.userEmail).subscribe(res => {
			console.log(res);
			this.challenge = new ChallengeInfo();
			this.challenge.challengeName = (res as ChallengeInfo).challengeName;
			this.challenge.exercises = (res as ChallengeInfo).exercises;
			for(let exercise of this.challenge.exercises) {
				let nameBegin = exercise.indexOf('[') + 1;
				let nameEnd = exercise.indexOf(']');
				let repsBegin = exercise.indexOf('{') + 1;
				let repsEnd = exercise.indexOf('}');
				let n = exercise.substring(nameBegin, nameEnd);
				let r = exercise.substring(repsBegin, repsEnd);
				let er = new ExerciseReps();
				er.name = n;
				er.reps = r;
				this.reps.push(er);
			}
			});
		
  	}

}

