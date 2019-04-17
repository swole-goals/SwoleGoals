import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.css']
})
export class ExerciseResultComponent implements OnInit {
  public repsTotal = 20;
  public userEmail: string = '';
  constructor(private dataService : DataService) { }
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
	this.userEmail = this.dataService.getUserEmail();
  }

}
