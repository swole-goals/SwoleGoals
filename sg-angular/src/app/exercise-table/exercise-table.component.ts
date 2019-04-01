import { Component, OnInit } from '@angular/core';
import { ExerciseTableService } from './exercise-table.service';
import { StrengthInfo } from './strengthInfo';

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
	constructor(private tableService: ExerciseTableService) { 
		this.tableService.getStrengthLevelDataUnfiltered().subscribe(res => {
			this.strengthInformation = res;
			console.log(this.strengthInformation[0]);
			this.onChange('Barbell');
			this.selectedExercise = this.strengthInformation[0];
		});
	}
          
	onChange(value: string) {
		console.log(value);
		this.filteredInformation = [];
		let i = 0;
		for(let exercise of this.strengthInformation) {
			if (exercise.exercise_family === value) {
				this.filteredInformation[i++] = exercise;
			}
		}	
	}
	onChangeExercise(value: number) {
		console.log(value);
		for(let exercise of this.filteredInformation) {
			if (exercise.exercise_id == value) {
				this.selectedExercise = exercise;
				console.log(exercise);
				break;
			}
		}
	}	
  	ngOnInit() {
  	}

}
