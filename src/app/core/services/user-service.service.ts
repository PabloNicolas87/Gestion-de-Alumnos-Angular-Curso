import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { CreateUserPayload, Usuario } from '../models/index-usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(environment.baseAPIURL + '/users')
  }
  getUsersById(id: number): Observable<Usuario | undefined> {
    return this.httpClient.get<Usuario>(environment.baseAPIURL + '/users/' + id)
  }

  createUsers(payload: CreateUserPayload): Observable<Usuario> {
    return this.httpClient.post<Usuario>(environment.baseAPIURL + '/users/', payload)
  }
  
}
