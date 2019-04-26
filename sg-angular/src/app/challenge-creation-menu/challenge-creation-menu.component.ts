import { Component, OnInit, ViewChild } from '@angular/core';
import {ExerciseListService} from "../exercise-list/exercise-list.service";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel} from "@angular/cdk/collections";
import {Challenge} from "../services/challenge";
import { UserService } from '../services/user.service';
import {ChallengeService} from '../services/challenge.service'

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
  public dataSource1;
  public dataSource2;
  selection = new SelectionModel(true, []);
  selectedSelection =  new SelectionModel(true, []);
  displayedColumns1: string[] = ['select', 'name'];
  displayedColumns2: string[] = ['select', 'name', 'slider'];
  data;
  selectedExercises = [];
  exercisesToRemove = [];
  exerciseReps = [];
  currentFilter: string;
  challengeName = '';
  groupName: String;
  ans: Challenge;


  constructor(private exerciseService: ExerciseListService,
              private challengeService: ChallengeService,
              private userService: UserService) {
    this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
      this.dataSource1 = new MatTableDataSource(res);
      this.dataSource1.paginator = this.paginator;
      this.data = Object.assign(res);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    this.currentFilter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource1.data.length;
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
      this.dataSource1 = new MatTableDataSource(this.dataSource1.data);
      this.dataSource2 = new MatTableDataSource(this.selectedExercises);
    });

    this.selection = new SelectionModel(true, []);
    this.selectedSelection = new SelectionModel(true, []);
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.filter = this.currentFilter;
  }

  removeExercises() {
    this.selectedSelection.selected.forEach(exercise => {
      let index: number = this.selectedExercises.findIndex(i => i === exercise);
      this.selectedExercises.splice(index, 1);
      this.exerciseReps.splice(index, 1);
    });
    this.selectedSelection = new SelectionModel(true, []);
    this.dataSource2 = new MatTableDataSource(this.selectedExercises);
    this.exercisesToRemove = [];
  }

  createChallenge(){
    if (this.groupName ===  null){
      alert('Please create your group or join a group first.');
      return;
    }
    let exerciseNames = [];
    let challengeData = [];
    for(let exercise of this.selectedExercises){
      exerciseNames.push(exercise.name);
    }
    challengeData.push(this.challengeName);
    challengeData.push(exerciseNames);
    challengeData.push(this.exerciseReps);
    challengeData.push(this.userService.getUserGroup());
    console.log(challengeData);
    this.challengeService.postChallengedata(challengeData).subscribe((response) => {
        let challengeInfo = response;
        if (challengeInfo !== 'exists') {
          console.log('challenge created');
          alert('Challenge Created');
        } else {
          alert('Challenge not created: Challenge name already exists. Please rename your challenge.');
        }
    });
  }


  ngOnInit() {
    this.groupName = this.userService.getUserGroup();
  }
}
