import { Component, OnInit } from '@angular/core';
import { ExerciseTableService } from './exercise-table.service';
import { StrengthInfo } from './strengthInfo';
import {ExerciseService} from "../services/exercise.service";

@Component({
  selector: 'app-exercise-table',
  templateUrl: './exercise-table.component.html',
  styleUrls: ['./exercise-table.component.css'],
  providers: [ExerciseTableService]
})
export class ExerciseTableComponent implements OnInit {
  public strengthInformation: Array<StrengthInfo>;
  public filteredInformation: Array<StrengthInfo> = [];
  public selectedExercise: StrengthInfo;
	
  constructor(private exerciseService: ExerciseService) {
    this.exerciseService.getStrengthLevelDataUnfiltered().subscribe(res => {
      this.strengthInformation = res;
      this.onChange('Barbell');
      this.selectedExercise = this.strengthInformation[0];
    });
  }
          
  onChange(value: string) {
    this.filteredInformation = [];
    let i = 0;
    for(let exercise of this.strengthInformation) {
      if (exercise.exercise_family === value) {
	this.filteredInformation[i++] = exercise;
      }
    }	
  }
	
  onChangeExercise(value: number) {
    for(let exercise of this.filteredInformation) {
      if (exercise.exercise_id == value) {
	this.selectedExercise = exercise;
	  break;
	}
      }
    }	
	
  ngOnInit() {
  }

}
