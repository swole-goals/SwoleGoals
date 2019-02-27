import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { ExerciseInfo } from './exerciseinfo';

@Injectable({
  providedIn: 'root'
})
export class ExerciseListService {
  url: string = ''
  
  constructor(private httpClient: HttpClient) { }
  
  getExerciseListUnfiltered() {
    return this.httpClient.get(`https://swolegoalsdatabase.appspot.com/getEx`).
      pipe(
        map((item: any) => item.map(e => <ExerciseInfo>
        {
          name: e.name,
          type: e.typew,
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
