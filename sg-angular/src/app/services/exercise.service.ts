import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {StrengthInfo} from "../exercise-table/strengthInfo";
import {environment} from "../../environments/environment";
import {ExerciseInfo} from "../exercise-list/exerciseinfo";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private httpClient: HttpClient) { }

  getStrengthLevelDataUnfiltered() {
    return this.httpClient.get(`https://swolegoalsdatabase.appspot.com/getStrength`).pipe(
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

  getExerciseListUnfiltered() {
    return this.httpClient.get(environment.sqlURL+`/getEx`).
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
