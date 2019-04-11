import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { UserInfo } from './friendsinfo';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  url: string = ''
  
  constructor(private httpClient: HttpClient) { }
  
  getUserListUnfiltered() {
    return this.httpClient.get(`https://swolegoalsdatabase.appspot.com/getUser`).
      pipe(
        map((item: any) => item.map(e => <UserInfo>
        {
          LastName: e.LastName,
          FirstName: e.FirstName,
          Email: e.Email,
          Reg_date: e.Reg_date   
        })));
  }
}