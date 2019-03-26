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
    return this.httpClient.post('https://swolegoalsfirestore.appspot.com/addUser', {'name' : `${userData.name}`, 'email' : `${userData.email}`})
  }
}
