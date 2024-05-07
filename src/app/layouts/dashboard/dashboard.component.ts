import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;
  isMobile(): boolean {
    return window.innerWidth <= 580;
  }

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }

}
