import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsersService } from '../../../../../../core/services/user-service.service';
import { Observable, of, Subscription } from 'rxjs';
import { Usuario } from '../../../../../../core/models/index-usuario';

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
    console.log(this.loading);
    const userIdParam = (this.activatedRoute.snapshot.params['idUsuario']);
    this.subscription = this.usersService.getUsersById(userIdParam)
      .subscribe({
        next: (user) => {
          if (user) {
            this.user$ = of(user);
          } else {
            console.error('El usuario no existe');
          }
        },
        error: (err) => {
          console.error('Error al obtener el usuario:', err);
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
