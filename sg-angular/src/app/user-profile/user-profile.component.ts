import { UserProfileService } from './user-profile.service';
import { DataService } from './../../services/data.service';
import { Component, OnChanges, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from './group';
import { User } from './user';
import { Router } from '@angular/router';
import { GetChallengesService } from 'src/services/get-challenges.service';
import { SetGroupChallengeService } from 'src/services/set-group-challenge.service';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from '../challenge-creation-menu/challenge-creation-menu.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  loggedIn: boolean;
  hasGroup: boolean;
  groupName: String;
  groupMembers: Array<string>;
  userName: String;
  userEmail: String;
  image: String;
  age: Number;
  height: Number;
  weight: Number;
  dataSource;
  displayedColumns: string[] = ['select', 'challenge'];
  selectedChallenge = new SelectionModel(false, []);

  constructor(private userProfileService: UserProfileService,
              private http: HttpClient,
              private getChallengesService: GetChallengesService,
              private setGroupChallengeService: SetGroupChallengeService) {
    this.getChallengesService.getAPIdata().subscribe(res => {
      this.dataSource = res;
    });
  }

  ngOnInit() {
    this.loggedIn = false;
    this.hasGroup = false;
    if(DataService.getUserEmail()!=null){
      this.getUserInfo();
    }
  }

  getUserInfo(){
    this.userProfileService.getUser(DataService.getUserEmail()).subscribe(res => {
      DataService.setUserData(res);
      this.age = DataService.getUserAge();
      this.height = DataService.getUserHeight();
      this.weight = DataService.getUserWeight();
      this.groupName = DataService.getUserGroup();
      this.userEmail = DataService.getUserEmail();
      this.image = DataService.getUserImage();
      this.userName = DataService.getUserName();
      console.log(this.groupName);
      if(this.groupName!="null" && this.groupName!=null){
        console.log(this.groupName);
        this.getGroupMembers();
      }
      else {
        console.log("Logged In");
        this.loggedIn = true;
      }
    })
  }
  
  getUsers(){
    this.userProfileService.getUsers().subscribe(res => {
      console.log(res);
    })
  }

  getGroupMembers() {
    this.userProfileService.getGroup(this.groupName).subscribe(res => {
      DataService.setGroupData(res);
      this.groupMembers = DataService.getGroupUsers();
      this.hasGroup = true;
      this.loggedIn = true;
    })
  }

  joinGroup() {
    this.updateUserInfo();
    this.getGroupMembers();
    this.userProfileService.createGroup(this.groupName).subscribe((response) => {
      console.log('response from post data is ', response);
      DataService.setGroupData(response);
    }, (error) => {
      console.log('error during post is ', error)
    })
  }

  // add  dToGroup(  dEmail: string) {
  //   this.userData = this.dataService.getUserData();
  //   this.dataService.add  dToGroup(  dEmail);

  //   this.userProfileService.postAPIGroupAdd("FINAL_GROUP",   dEmail).subscribe((response) => {
  //     console.log('response from add  dToGroup ', response);
  //   }, (error) => {
  //     console.log('error during add   d to group ', error)
  //   })

  //   this.groupMembers = this.dataService.getGroupMembers();
  //   console.log("THIS GROUP MEMB: ", this.groupMembers);
  //   console.log("CURRENT GROUP MEMBERS: ", this.groupMembers);
  // }

  // remove  dFromGroup(  dEmail: string) {
  //   this.userData = this.dataService.getUserData();
  //   this.dataService.remove  dFromGroup(  dEmail);

  //   this.userProfileService.postAPIGroupRemove("FINAL_GROUP",   dEmail).subscribe((response) => {
  //     console.log('response from remove  dFromGroup ', response);
  //   }), (error) => {
  //     console.log('error during remove   d from group ', error)
  //   }
  //   this.groupMembers = this.dataService.getGroupMembers();
  //   console.log("CURRENT GROUP MEMBERS: ", this.groupMembers);
  // }

  updateUserInfo() {
    console.log("Updating User Info");
    console.log("Group: ", this.groupName);
    DataService.setUserGroup(this.groupName);
    DataService.setUserAge(this.age);
    DataService.setUserHeight(this.height);
    DataService.setUserWeight(this.weight);
    this.userProfileService.updateUser().subscribe((response) => {
      console.log('response from post data is ', response);
    }, (error) => {
      console.log('error during post is ', error)
    })
  }

  setChallenge(){//
    if (confirm('Are you sure you want to set your Challenge? This will remove all progress your group has made on your ' +
      'current challenge.')) {
      let groupAndChallenge = [];
      groupAndChallenge.push(DataService.getUserGroup());
      groupAndChallenge.push(this.selectedChallenge.selected[0]);
      console.log(groupAndChallenge);
      this.setGroupChallengeService.postAPIdata(groupAndChallenge).subscribe((res) => {
          DataService.setChallengeName(String(res));
      });
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectedChallenge.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectedChallenge.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
}
