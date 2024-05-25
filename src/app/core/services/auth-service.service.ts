import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/index-usuario';
import { LoginData } from '../models/index-auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private MOCK_AUTH_USER: Usuario = {
    id: 1,
    firstname: 'Pablo',
    lastname: 'Girone',
    email: 'pablo1@gmail.com',
    birth: new Date('12/8/1988')
  }

  private _authUser$ = new BehaviorSubject<Usuario | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}
  
  login(data: LoginData): void {

    if (data.email !== 'usuario1@mail.com' || data.password !== '123456') {
      alert('Datos incorrectos');
    } else {
      this._authUser$.next(this.MOCK_AUTH_USER);  
      localStorage.setItem('accessToken', '123');
      this.router.navigate(['dashboard','home']);
    }
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._authUser$.next(this.MOCK_AUTH_USER);
      return true;
    }else {
      return false;
    }
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth']);
  }
}
