import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }
  postAPIData(userData){
    console.log(userData);
    //console.log(userData.name); 
    //TODO: CHANGE BELOW TO https://swolegoalsfirestore.appspot.com/
    return this.httpClient.post('http://localhost:8080/addUser', {'name' : `${userData.name}`, 'email' : `${userData.email}`});
  }
}