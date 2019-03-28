import { Component, OnInit } from '@angular/core';
import { ExerciseListService } from './exercise-list.service';
import { ExerciseInfo } from './exerciseinfo';



/**
 * @title Table with filtering
 */

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
  providers: [ExerciseListService]
})
export class ExerciseListComponent implements OnInit {
	public exercisesList: Array<ExerciseInfo>;
	public types: Array<string> = ['Strength', 'Strongman', 'Plyometrics', 'Powerlifting', 'Stretching', 'Olympic Weightlifting', 'Cardio'];
	public muscles: Array<string> = ['Chest', 'Forearms', 'Lats', 'Middle Back', 'Lower Back', 'Neck', 'Quadriceps', 'Hamstrings', 'Calves', 'Triceps', 'Traps', 'Shoulders', 'Abdominals', 'Glutes', 'Biceps', 'Abductors'];
	public equipments: Array<string> = ['Dumbell', 'Body Only', 'Cable', 'Other', 'Barbell', 'E-Z Curl Bar', 'Machine', 'Medicine Ball', 'Kettlebells', 'Exercise Ball', 'None', 'Foam Ball', 'Bands'];
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	constructor(private exerciseService: ExerciseListService) { 
  		this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
			this.exercisesList = res;
		});
  	}

  ngOnInit() {
  }

}
