import { Injectable } from '@angular/core';
import { Group } from './group'
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private group: Group;

  constructor(private httpClient: HttpClient) {  }

  getGroupData(name: string): Group {
    this.httpClient.post<Group>(environment.fireStoreURL + '/getGroup', { 'groupName': `${name}` }, httpOptions).subscribe( res=> {
      console.log(res);
      this.group=res;
    });
    return this.group;
  }
  getGroupMembers() {
    return this.group.users;
  }
  getGroupName() {
    return this.group.name;
  }
  //Do not call directly
  private setGroupData(email: String) {
    return this.httpClient.post<Group>(environment.fireStoreURL + '/updateGroup', {'groupName': `${this.getGroupName()}`, 'userEmail': `${email}`}, httpOptions).subscribe(res=>{
      this.group=res;
    })
  }
  setGroupName(val: string) {
    this.getGroupData(val);
  }
  addUsertoGroup(email: String){
    this.setGroupData(email);
  }
}