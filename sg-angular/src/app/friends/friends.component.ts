import { Component, OnInit } from '@angular/core';
import { UserInfo } from './friendsinfo';
import { UserListService } from './friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
  providers: [UserListService]
})
export class FriendsComponent implements OnInit {
  private userList: Array<UserInfo>;
  constructor(private userService: UserListService) {
      this.userService.getUserListUnfiltered().subscribe(res => {
      this.userList = res;
    })
   }

  ngOnInit() {
  }

}
