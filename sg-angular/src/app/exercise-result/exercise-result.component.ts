import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResultsComponent } from '../results/results.component';

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
  constructor(private userService : UserService, private router: Router, private resultsComponent: ResultsComponent, private activatedRoute: ActivatedRoute) { }
  increaseReps() { 
  	this.repsTotal++;
  }
  decreaseReps() { 
  	this.repsTotal--;
  }
  submitReps() {
  	this.resultsComponent.updateChallengeResultsUserExercise(this.name, String(this.repsTotal), this.userEmail)
  	this.router.navigate(['/app-map']);
  }
  ngOnInit() {
	this.userEmail = this.userService.getUserEmail();
	this.groupName = this.userService.getUserGroup();
	this.challenge = this.activatedRoute.snapshot.paramMap.get('challenge');
        this.name = this.activatedRoute.snapshot.paramMap.get('exercise');
  }

}
