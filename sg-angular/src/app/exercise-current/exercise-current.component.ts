import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ExerciseCurrentService } from './exercise-current.service';
import { ExerciseInfo } from '../exercise-list/exerciseinfo';
import { MapService } from '../map/map.service';
import { ChallengeInfo } from '../map/challengeinfo';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-exercise-current',
  templateUrl: './exercise-current.component.html',
  styleUrls: ['./exercise-current.component.css']
})

export class ExerciseCurrentComponent implements OnInit {
  public progress = 70;
  public name = 'Dumbell Press';
  public description = 'Exercise Description';
  public reps = 20;
  public challenge: string = 'Current Challenge';
  public exercisesCurrent: Array<ExerciseInfo>;
  public image1Url: string = '';
  public image2Url: string = '';
  public resultsUrl: string = '';
  public mapUrl: string = '/app-map';
  public userEmail: string = '';
  private route: ActivatedRoute;
  constructor(private activatedRoute: ActivatedRoute, private currentService: ExerciseCurrentService, private router: Router, private userService: UserService, private mapService: MapService) {
  }
  backToMap() {
    this.router.navigate(['/app-map']); 	
  }
  toResults() {
    this.router.navigate([this.resultsUrl]);
  }
  ngOnInit() {
    this.challenge = this.activatedRoute.snapshot.paramMap.get('challenge');
    this.name = this.activatedRoute.snapshot.paramMap.get('exercise');
    this.userEmail = this.userService.getUserEmail();
    let formattedExercise = '';
    for(let word of this.name.split(' ')){
      formattedExercise += word + `%20`;
    }	
    formattedExercise = formattedExercise.slice(0, formattedExercise.length - 3);	
    let formattedChallenge = '';
    for(let word of this.challenge.split(' ')){
      formattedChallenge += word + `%20`;
    }
    formattedChallenge = formattedChallenge.slice(0, formattedChallenge.length - 3);
    this.resultsUrl = `/app-exercise-result/` + this.challenge + `/` + this.name;
    this.currentService.getExercise(formattedExercise).subscribe(res => {
      this.exercisesCurrent = res;
      this.description = res[0].instructions;
      this.image1Url = res[0].image1;
      this.image2Url = res[0].image2;
    });
    this.mapService.getChallenge(this.userEmail).subscribe(res => {
      let c = (res as ChallengeInfo);
      for(let exercise of c.exercises) {
        let nameBegin = exercise.indexOf('[') + 1;
        let nameEnd = exercise.indexOf(']');
        let repsBegin = exercise.indexOf('{') + 1;
        let repsEnd = exercise.indexOf('}');
        let n = exercise.substring(nameBegin, nameEnd);
        if(this.name == n) {
          this.reps = Number(exercise.substring(repsBegin, repsEnd));
        }
      }
    });	
  }
}
