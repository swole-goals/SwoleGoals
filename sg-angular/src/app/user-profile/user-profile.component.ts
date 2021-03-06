import { UserProfileService } from './user-profile.service';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from '../challenge-creation-menu/challenge-creation-menu.component';
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import {ChallengeService} from '../services/challenge.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  groupName: string;
  groupMembers: Array<string>;
  age: Number;
  height: Number;
  weight: Number;
  dataSource;
  displayedColumns: string[] = ['select', 'challenge', 'group'];
  selectedChallenge = new SelectionModel(false, []);

  constructor(private userProfileService: UserProfileService,
    public userService: UserService,
    private groupService: GroupService,
    private challengeService: ChallengeService,
) {
    this.challengeService.getChallenges().subscribe(res => {
      this.dataSource = res;
    });
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.getUserInfo();
    }
  }

  showGroupMembers() {
    this.groupService.getGroup(this.groupName).subscribe(res=>{
      if(res!=null){
        this.groupService.setGroup(res);
        this.groupMembers = this.groupService.getGroupMembers();
      }
    });
  }

  getUserInfo() {
    this.age = this.userService.getUserAge();
    this.height = this.userService.getUserHeight();
    this.weight = this.userService.getUserWeight();
    if (this.userService.hasGroup()) {
      this.groupName = this.userService.getUserGroup();
      this.showGroupMembers();
    }
  }
  joinGroup() {
    this.groupService.updateGroup(this.userService.getUserEmail(), this.userService.getUserGroup(), this.groupName);
    this.userService.setUserGroup(this.groupName);
    this.showGroupMembers();
  }
  createNewGroup() {
    this.groupService.setGroupData(this.userService.getUserEmail(), null, this.groupName);
    this.userService.setUserGroup(this.groupName);
    this.showGroupMembers();
  }

  updateUserInfo() {
    this.userService.setUserInfo(this.age, this.height, this.weight);
  }

  setChallenge() {
    if (confirm('Are you sure you want to set your Challenge? This will remove all progress your group has made on your ' +
      'current challenge.')) {
      let groupAndChallenge = [];
      groupAndChallenge.push(this.userService.getUserGroup());
      groupAndChallenge.push(this.selectedChallenge.selected[0][0]);
      console.log(groupAndChallenge);
      this.challengeService.setGroupChallenge(groupAndChallenge).subscribe((res) => {
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
