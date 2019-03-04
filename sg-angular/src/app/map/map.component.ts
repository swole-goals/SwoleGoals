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

	public exercisesList: Array<ExerciseInfo>;
	public exerciseAbout: string = "Click a tile to learn more";
  	constructor(private exerciseService: MapService) {

  	}

 	aboutExercise(index: number) {
		this.exerciseAbout = "Muscles: " + this.exercisesList[index].muscles;
	}

  	ngOnInit() {
        	this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
                	this.exercisesList = res;
        	});
  	}

}

