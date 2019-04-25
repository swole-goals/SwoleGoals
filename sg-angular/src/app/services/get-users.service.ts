import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get(environment.fireStoreURL + '/getAllUsers')
  }

}
