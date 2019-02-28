import { Component, OnInit } from '@angular/core';
import { ExerciseListService } from './exercise-list.service';
import { ExerciseInfo } from './exerciseinfo';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
  providers: [ExerciseListService]
})
export class ExerciseListComponent implements OnInit {
  private exercisesList: Array<ExerciseInfo>;
  constructor(private exerciseService: ExerciseListService) { 
  	this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
		this.exercisesList = res;
	});

  }

  ngOnInit() {
  }

}
