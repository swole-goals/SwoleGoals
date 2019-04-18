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

  getGroup(name: string): Observable<Group> {
    return this.getGroupData(name);
  }
  getGroupMembers() {
    return this.group.users;
  }
  getGroupChallenge() {
    return this.group.challenge;
  }
  setGroup(val: Group){
    this.group = val;
  }
  setGroupChallenge(val: string) {
    this.group.challenge = val;
  }
  updateGroup(email: string, oldGroup: string, newGroup: string){
    if(oldGroup!=newGroup){
      this.getGroup(oldGroup).subscribe(req=>{
        this.setGroupData(email, oldGroup, newGroup);
      })
    }
    else {
      this.getGroup(newGroup).subscribe(res=>{
        if(res==null){
          this.setGroupData(email, null, newGroup);
        }
      });
    }
  }
  //Do not call directly
  private getGroupData(name: string): Observable<Group> {
    return this.httpClient.post<Group>(environment.fireStoreURL + '/getGroup', { 'groupName': `${name}` }, httpOptions)
  }
  //Do not call directly
  setGroupData(email: string, oldGroup: string, newGroup: string) {
    console.log(email,oldGroup,newGroup);
    return this.httpClient.post<Group>(environment.fireStoreURL + '/updateGroup', { 'groupName': `${newGroup}`, 'oldGroup': `${oldGroup}`,  'userEmail': `${email}`}, httpOptions).subscribe(res=>{
      this.getGroup(newGroup).subscribe(res=>{
        this.group = res;
      });
    })
  }
}
