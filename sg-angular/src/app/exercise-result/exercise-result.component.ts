import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.css']
})
export class ExerciseResultComponent implements OnInit {
  public repsTotal = 20;
  constructor() { }
  increaseReps() { 
  	this.repsTotal++;
  }
  decreaseReps() { 
  	this.repsTotal--;
  }
  ngOnInit() {
  }

}
