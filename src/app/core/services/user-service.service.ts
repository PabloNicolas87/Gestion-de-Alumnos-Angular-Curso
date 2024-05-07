import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { CreateUserPayload, Usuario } from '../models/index-usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(environment.baseAPIURL + '/users').pipe(delay(1500));
  }

  getUsersById(id: number): Observable<Usuario | undefined> {
    return this.httpClient.get<Usuario>(environment.baseAPIURL + '/users/' + id)
  }

  createUsers(payload: CreateUserPayload): Observable<Usuario> {
    return this.httpClient.post<Usuario>(environment.baseAPIURL + '/users/', payload)
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseAPIURL}/users/${id}`);
  }

  updateUser(id: number, payload: any): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${environment.baseAPIURL}/users/${id}`, payload);
  }
  
}
