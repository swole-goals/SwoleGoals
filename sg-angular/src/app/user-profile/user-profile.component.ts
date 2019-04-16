import { UserProfileService } from './user-profile.service';
import { DataService } from './../../services/data.service';
import { Component, OnChanges, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from './group';
import { User } from './user';
import {GetChallengesService} from "../../services/get-challenges.service";
import {SetGroupChallengeService} from "../../services/set-group-challenge.service";
import {SelectionModel} from "@angular/cdk/collections";
import {PeriodicElement} from "../challenge-creation-menu/challenge-creation-menu.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  group: Group;
  user: User;
  userData: object;
  groupName: String;
  userEmail: String;
  userName: String;
  image: String;
  loggedIn: boolean;
  dataSource;
  displayedColumns: string[] = ['select', 'challenge', 'group'];
  selectedChallenge = new SelectionModel(false, []);

  constructor(private dataService: DataService,
              private userProfileService: UserProfileService,
              private http: HttpClient,
              private getChallengesService: GetChallengesService,
              private setGroupChallengeService: SetGroupChallengeService) {
    this.getChallengesService.getAPIdata().subscribe(res => {
      this.dataSource = res;
    });
  }

  ngOnInit() {
    this.loggedIn = false;
    this.userData = this.dataService.getUserData();
    this.userName = this.dataService.getUserName();
    this.userEmail = this.dataService.getUserEmail();
    if(this.userEmail!=null){
      this.getUserInfo();
    }
  }

  getUserInfo(){
    this.userProfileService.getUser(this.userEmail).subscribe(res => {
      this.user = res;
      this.groupName = this.user.groupID;
      console.log(this.user);
      this.getGroupMembers();
    })
  }
  
  getUsers(){
    this.userProfileService.getUsers().subscribe(res => {
      console.log(res);
    })
  }

  getGroupMembers() {
    this.userProfileService.getGroup(this.groupName).subscribe(res => {
      this.group = res;
      this.loggedIn = true;
      console.log(this.group.users);
    })
  }

  joinGroup() {
    this.updateUserInfo();
    this.getGroupMembers();
    this.userProfileService.createGroup(this.groupName).subscribe((response) => {
      console.log('response from post data is ', response);
    }, (error) => {
      console.log('error during post is ', error)
    })
  }

  // addFriendToGroup(friendEmail: string) {
  //   this.userData = this.dataService.getUserData();
  //   this.dataService.addFriendToGroup(friendEmail);

  //   this.userProfileService.postAPIGroupAdd("FINAL_GROUP", friendEmail).subscribe((response) => {
  //     console.log('response from addFriendToGroup ', response);
  //   }, (error) => {
  //     console.log('error during add friend to group ', error)
  //   })

  //   this.groupMembers = this.dataService.getGroupMembers();
  //   console.log("THIS GROUP MEMB: ", this.groupMembers);
  //   console.log("CURRENT GROUP MEMBERS: ", this.groupMembers);
  // }

  // removeFriendFromGroup(friendEmail: string) {
  //   this.userData = this.dataService.getUserData();
  //   this.dataService.removeFriendFromGroup(friendEmail);

  //   this.userProfileService.postAPIGroupRemove("FINAL_GROUP", friendEmail).subscribe((response) => {
  //     console.log('response from removeFriendFromGroup ', response);
  //   }), (error) => {
  //     console.log('error during remove friend from group ', error)
  //   }
  //   this.groupMembers = this.dataService.getGroupMembers();
  //   console.log("CURRENT GROUP MEMBERS: ", this.groupMembers);
  // }

  updateUserInfo() {
    console.log("Updating User Info");
    console.log("Group: ", this.groupName);
    this.userProfileService.updateUser(this.user.age, this.user.height, this.user.weight, this.groupName).subscribe((response) => {
      console.log('response from post data is ', response);
    }, (error) => {
      console.log('error during post is ', error)
    })
  }

  setChallenge(){//
    if (confirm('Are you sure you want to set your Challenge? This will remove all progress your group has made on your ' +
      'current challenge.')) {
      let groupAndChallenge = [];
      groupAndChallenge.push(this.dataService.getUserGroup());
      groupAndChallenge.push(this.selectedChallenge.selected[0].challengeName);
      console.log(groupAndChallenge);
      this.setGroupChallengeService.postAPIdata(groupAndChallenge).subscribe((res) => {
          this.dataService.setchallengeName(String(res));
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
