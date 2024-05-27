import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authActions } from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { authUser } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnDestroy, OnInit{

  loginForm: FormGroup;

  authUserSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private store: Store ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.authUserSubscription = this.store.select(authUser).subscribe({
      next: (user) => {
        if (user) this.router.navigate(['dashboard', 'home' ])
      }
    })
  }

  ngOnDestroy(): void {
    this.authUserSubscription?.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
     this.store.dispatch(authActions.login({ payload: this.loginForm.getRawValue() }))
    }
  }
}
