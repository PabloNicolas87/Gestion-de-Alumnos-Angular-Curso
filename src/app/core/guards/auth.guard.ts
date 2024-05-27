import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService);
  const isAuth = authService.verifyToken();
  
  return isAuth || router.createUrlTree(['auth'])
};
