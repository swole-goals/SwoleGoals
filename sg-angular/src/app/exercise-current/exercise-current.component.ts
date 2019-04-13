import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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

  private route: ActivatedRoute;
  private router: Router;
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  	   this.challenge = this.activatedRoute.snapshot.paramMap.get('challenge');
  	   this.name = this.activatedRoute.snapshot.paramMap.get('exercise');
  }

}
