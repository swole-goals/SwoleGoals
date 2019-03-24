import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { StrengthInfo } from './strengthInfo';

@Injectable({
  providedIn: 'root'
})
export class ExerciseTableService {

	constructor(private httpClient: HttpClient) { }
	
	getStrengthLevelDataUnfiltered() {
		return this.httpClient.get(`https://swolegoalsdatabase.appspot.com/getStrength`).
      		pipe(
        	map((item: any) => item.map(e => <StrengthInfo>
        	{
          		performance_metric: e.performance_metric,
          		performance_a: e.performance_a,
          		performance_b: e.performance_b,
          		performance_c: e.performance_c,
          		performance_d: e.performance_d,
          		performance_e: e.performance_e,
          		exercise_family: e.exercise_family,
          		exercise_name: e.exercise_name,
          		exercise_id: e.exercise_id,
          		exercise_link_id: e.exercise_link_id,
        	})));
	
	}
}
