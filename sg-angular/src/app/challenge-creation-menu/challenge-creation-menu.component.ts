import { Component, OnInit, ViewChild } from '@angular/core';
import {ExerciseInfo} from "../exercise-list/exerciseinfo";
import {ExerciseListService} from "../exercise-list/exercise-list.service";
import {expressionChangedAfterItHasBeenCheckedError} from "@angular/core/src/view/errors";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel} from "@angular/cdk/collections";
import {ChallengeCreationService} from "./challenge-creation.service";
import {DataService} from "../../services/data.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-challenge-creation-menu',
  templateUrl: './challenge-creation-menu.component.html',
  styleUrls: ['./challenge-creation-menu.component.css']
})
export class ChallengeCreationMenuComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource;
  selection = new SelectionModel(true, []);
  displayedColumns: string[] = ['select', 'name', 'slider'];
  data;
  selectedExercises = [];
  exercisesToRemove = [];
  exerciseReps = [];
  currentFilter: string;

  constructor(private exerciseService: ExerciseListService,
              private challengeCreationService: ChallengeCreationService,
              private dataService: DataService) {
    this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.data = Object.assign(res);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.currentFilter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  addExercises() {
    this.selection.selected.forEach(exercise => {
      let index: number = this.data.findIndex(data => data === exercise);
      if (!this.selectedExercises.includes(this.data[index])) {
        this.selectedExercises.push(this.data[index]);
      }
      this.dataSource = new MatTableDataSource(this.dataSource.data);
    });
    this.selection = new SelectionModel(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filter = this.currentFilter;
  }

  removeExercises() {
    this.exercisesToRemove.forEach(exercise => {
      let index: number = this.selectedExercises.findIndex(data => data === exercise);
      this.selectedExercises.splice(index, 1);
    });
    this.exercisesToRemove = [];
  }

  createChallenge(){
    let exerciseNames = [];
    let challengeData = []
    let exerciseRepsChallenge = []
    for(let exercise of this.selectedExercises){
      exerciseRepsChallenge.push(this.exerciseReps[this.data.indexOf(exercise)]);
      exerciseNames.push(exercise.name);
    }
    challengeData.push(exerciseNames);
    challengeData.push(exerciseRepsChallenge);
    console.log(challengeData);
    this.challengeCreationService.postAPIdata(challengeData).subscribe((response)=>{
        let challengeInfo = response;
        this.dataService.setChallengeData(response);
        if (challengeInfo != null){
          console.log('challenge created');
          alert('Challenge Created');
        }
    })
  }


  ngOnInit() {
  }

}
