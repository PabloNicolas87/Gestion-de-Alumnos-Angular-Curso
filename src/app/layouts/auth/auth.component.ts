import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnDestroy, OnInit{
  authUserCHangeSubs?: Subscription;
  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.subscribeToAuthUserChange();
  }

  ngOnDestroy(): void {
    this.authUserCHangeSubs?.unsubscribe();
  }

  subscribeToAuthUserChange(): void {
    this.authUserCHangeSubs = this.authService.authUser$.subscribe(
      {
        next: (authUser) => {
          if (authUser != null) {
            this.router.navigate(['dashboard', 'home'])
          }
        }
      }
    )
  }

  login() {
    this.authService.login();
  }
}
