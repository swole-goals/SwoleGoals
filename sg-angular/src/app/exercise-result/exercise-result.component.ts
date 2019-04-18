import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.css']
})
export class ExerciseResultComponent implements OnInit {
  public repsTotal = 20;
  public userEmail: string = '';
  constructor(private userService : UserService) { }
  increaseReps() { 
  	this.repsTotal++;
  }
  decreaseReps() { 
  	this.repsTotal--;
  }
  submitReps() {
  window.location.href = '/app-map';
  }
  ngOnInit() {
	this.userEmail = this.userService.getUserEmail();
  }

}
