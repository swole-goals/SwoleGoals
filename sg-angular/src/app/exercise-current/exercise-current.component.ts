import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-current',
  templateUrl: './exercise-current.component.html',
  styleUrls: ['./exercise-current.component.css']
})
export class ExerciseCurrentComponent implements OnInit {
  public progress = 70;
  public name = 'Dumbell Press';
  public description = 'Exercise Description';
  public reps = 20
  constructor() { }

  ngOnInit() {
  }

}
