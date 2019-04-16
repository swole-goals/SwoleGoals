import { UserProfileService } from './user-profile.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { GetChallengesService } from 'src/services/get-challenges.service';
import { SetGroupChallengeService } from 'src/services/set-group-challenge.service';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from '../challenge-creation-menu/challenge-creation-menu.component';
import { UserService } from 'src/services/user.service';

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
  age: Number;
  height: Number;
  weight: Number;
  dataSource;
  displayedColumns: string[] = ['select', 'challenge', 'group'];
  selectedChallenge = new SelectionModel(false, []);

  constructor(private userProfileService: UserProfileService,
    private userService: UserService,
    private getChallengesService: GetChallengesService,
    private setGroupChallengeService: SetGroupChallengeService) {
    this.getChallengesService.getAPIdata().subscribe(res => {
      this.dataSource = res;
    });
  }

  ngOnInit() {
    this.loggedIn = false;
    this.hasGroup = false;
    if (this.userService.getUserEmail() != null) {
      this.getUserInfo();
    }
  }

  getUserInfo() {
    this.groupName = this.userService.getUserGroup();
    this.age = this.userService.getUserAge();
    this.height = this.userService.getUserHeight();
    this.weight = this.userService.getUserWeight();
    if (this.groupName != "null" && this.groupName != null) {
      this.getGroupMembers();
    }
    else {
      console.log("Logged In");
      this.loggedIn = true;
    }
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

  updateUserInfo() {
    console.log("Updating User Info");
    console.log("Group: ", this.groupName);
    this.userService.setUserGroup(this.groupName);
    this.userService.setUserInfo(this.age, this.height, this.weight);
  }

  setChallenge() {//
    if (confirm('Are you sure you want to set your Challenge? This will remove all progress your group has made on your ' +
      'current challenge.')) {
      let groupAndChallenge = [];
      groupAndChallenge.push(this.userService.getUserGroup());
      groupAndChallenge.push(this.selectedChallenge.selected[0][0]);
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
