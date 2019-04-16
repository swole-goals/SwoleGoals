import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../../services/user';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }
  postAPIData(userData): Observable<User>{
    console.log(userData);
    //console.log(userData.name); 
    //TODO: CHANGE BELOW TO https://swolegoalsfirestore.appspot.com/
    return this.httpClient.post<User>(environment.fireStoreURL+'/addUser', {'name' : `${userData.name}`, 'email' : `${userData.email}`, 'image' : `${userData.image}`});
  }
}