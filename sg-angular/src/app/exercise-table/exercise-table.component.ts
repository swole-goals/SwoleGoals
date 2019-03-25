import { Component, OnInit } from '@angular/core';
import { ExerciseTableService } from './exercise-table.service';
import { StrengthInfo } from './strengthInfo';

@Component({
  selector: 'app-exercise-table',
  templateUrl: './exercise-table.component.html',
  styleUrls: ['./exercise-table.component.css'],
  providers: [ExerciseTableService]
})
export class ExerciseTableComponent implements OnInit {
 	public strengthInformation: Array<StrengthInfo>;
	constructor(private tableService: ExerciseTableService) { 
		this.tableService.getStrengthLevelDataUnfiltered().subscribe(res => {
			this.strengthInformation = res;
		});
	}
	
  	ngOnInit() {
  	}

}
