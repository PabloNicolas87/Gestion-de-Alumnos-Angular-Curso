import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<Usuario | null>(null);
  public authUser$ = this._authUser$.asObservable();

  login(): void {
    this._authUser$.next(
      {
      id: 1,
      firstname: 'Pablo',
      lastname: 'Girone',
      email: 'pablo1@gmail.com',
      birth: new Date('12/8/1988')
      }
    );
  }

  logout(): void {
    this._authUser$.next(null);
  }
  constructor() { }
}
