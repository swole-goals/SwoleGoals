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
	public filteredList: Array<ExerciseInfo>;	
	public types: Array<string> = ['Strength', 'Strongman', 'Plyometrics', 'Powerlifting', 'Stretching', 'Olympic Weightlifting', 'Cardio'];
	public muscles: Array<string> = ['Chest', 'Forearms', 'Lats', 'Middle Back', 'Lower Back', 'Neck', 'Quadriceps', 'Hamstrings', 'Calves', 'Triceps', 'Traps', 'Shoulders', 'Abdominals', 'Glutes', 'Biceps', 'Abductors'];
	public equipments: Array<string> = ['Dumbell', 'Body Only', 'Cable', 'Other', 'Barbell', 'E-Z Curl Bar', 'Machine', 'Medicine Ball', 'Kettlebells', 'Exercise Ball', 'None', 'Foam Ball', 'Bands'];
		
	public selectedType = '';
	public selectedEquipment= '';
	public selectedMuscle = '';
	public selectedExercise = null;
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	constructor(private exerciseService: ExerciseListService) { 
  		this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
			this.exercisesList = res;
			console.log(res[0]);
			this.selectedExercise = res[0];
			this.selectedType = res.type;
			this.selectedEquipment = res.equipment;
			this.selectedMuscle = res.muscle;
		});
	}

	onChangeType(value: string) {
		this.selectedType = value;	
	}

	onChangeEquipment(value: string) {
		this.selectedEquipment = value;
	}

	onChangeMuscle(value: string) {
		this.selectedMuscle = value;
	}
	filterExercises() {
		this.filteredList = [];
		this.exercisesList.forEach(e => {
		if(e.muscles === this.selectedMuscle && e.equipment === this.selectedEquipment && e.type === this.selectedType) {
			this.filteredList.push(e);
		}
		});
	}
  ngOnInit() {
  }

}
