import { UserProfileService } from './user-profile.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData : object;
  constructor(private dataService : DataService, private userProfileService : UserProfileService) { 
    //var userData = this.dataService.getUserData();
  
  }

  ngOnInit() {
    this.userData = this.dataService.getUserData();
    console.log("userprofile:", this.dataService.getUserData());
  }

}
