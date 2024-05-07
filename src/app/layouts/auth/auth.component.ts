import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnDestroy, OnInit{
  authUserCHangeSubs?: Subscription;

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.authUserCHangeSubs?.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.getRawValue());  
    }
  }
}
