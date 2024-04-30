import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Usuario } from '../models/index';

const USERS_DB: Usuario[] = [
  {
    id: 1,
    firstname: 'Pablo',
    lastname: 'Girone',
    email: 'pablo1@gmail.com',
    birth: new Date('12/8/1988')
  },
  {
    id: 2,
    firstname: 'Nicolás',
    lastname: 'Girone',
    email: 'nicolas1@gmail.com',
    birth: new Date('02/12/1998')
  },
]

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  getUsers(): Observable<Usuario[]> {
    return of (USERS_DB).pipe(delay(1500))
  }
  getUsersById(id: number): Observable<Usuario | undefined> {
    const userId = parseInt(id.toString(), 10);
    return of (USERS_DB.find((el) => el.id === userId)).pipe(delay(1500))
  }
}
