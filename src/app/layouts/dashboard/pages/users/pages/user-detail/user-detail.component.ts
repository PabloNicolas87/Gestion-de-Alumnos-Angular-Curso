import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsersService } from '../../../../../../core/services/user-service.service';
import { Observable, of, Subscription } from 'rxjs';
import { Usuario } from '../../../../../../core/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user$: Observable<Usuario | undefined> = of(undefined);
  loading = true;
  private subscription: Subscription = new Subscription();

  constructor (
    private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private usersService: UsersService 
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const userIdParam = parseInt(this.activatedRoute.snapshot.params['idUsuario']);
    this.subscription = this.usersService.getUsersById(userIdParam)
      .subscribe({
        next: (user) => {
          this.user$ = of(user);
        },
        complete: () => {
          this.loading = false;
          console.log('Observable completed');
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
