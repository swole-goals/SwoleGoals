import { Injectable } from '@angular/core';
import { ExerciseInfo } from '../exercise-list/exerciseinfo';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseCurrentService {

  constructor(private httpClient: HttpClient) { }
  getExercise(formattedExercise: string) {
  	return this.httpClient.get(environment.sqlURL+`/getExercises/`+formattedExercise).
		pipe(
			map((item: any) => item.map(e => <ExerciseInfo>
        		{
          			name: e.name,
          			type: e.type,
          			muscles: e.muscles,
          			equipment: e.equipment,
          			level: e.level,
          			review: e.review,
          			instructions: e.instructions,
          			image1: e.image2,
          			image2: e.image2
        		})));

  }
}
