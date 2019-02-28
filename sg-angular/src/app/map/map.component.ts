import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';
import { ExerciseInfo } from '../exercise-list/exerciseinfo';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MapService]  
})
export class MapComponent implements OnInit {

  private exercisesList: Array<ExerciseInfo>;
  constructor(private exerciseService: MapService) {
        this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
                this.exercisesList = res;
        });

  }

  ngOnInit() {
  }

}

