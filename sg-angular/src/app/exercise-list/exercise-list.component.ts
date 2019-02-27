import { Component, OnInit } from '@angular/core';
import { ExerciseListService } from './exercise-list.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
  providers: [ExerciseListService]
})
export class ExerciseListComponent implements OnInit {

  constructor(private exerciseService: ExerciseListService) { 
  	this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
	//console.log('Response received is ', res);
		console.log(res);
	});
  }

  ngOnInit() {
  }

}
