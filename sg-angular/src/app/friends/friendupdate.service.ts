import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendUpdateService {

  constructor(private httpClient : HttpClient) { }
  postAPIData(currUserEmail, friendEmail){
    console.log(friendEmail);
    //console.log(userData.name); 
    return this.httpClient.post('http://localhost:8080/addFriend', {'currUser' : currUserEmail, 'friends' : friendEmail})
  }

  postAPIDataGroup(groupName, userEmail) {
    console.log("Reached postAPIDataGroup with groupName: ", groupName)
    return this.httpClient.post('http://localhost:8080/addGroup', {'groupName' : groupName, 'userEmail' : userEmail})
  }
}
