import { Component, OnInit, ViewChild } from '@angular/core';
import {ExerciseInfo} from "../exercise-list/exerciseinfo";
import {ExerciseListService} from "../exercise-list/exercise-list.service";
import {expressionChangedAfterItHasBeenCheckedError} from "@angular/core/src/view/errors";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel} from "@angular/cdk/collections";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



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

  constructor(private exerciseService: ExerciseListService) {
    this.exerciseService.getExerciseListUnfiltered().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.data = Object.assign(res);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  }

  removeExercises() {
    this.exercisesToRemove.forEach(exercise => {
      let index: number = this.selectedExercises.findIndex(data => data === exercise);
      this.selectedExercises.splice(index, 1);
    });
    this.exercisesToRemove = [];
  }

  ngOnInit() {
  }

}
