import { Component } from '@angular/core';
import { Usuario } from './models/index';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'createdat'];

  users: Usuario[] = [
    {
      id: 1,
      firstname: 'Pablo',
      lastname: 'Girone',
      email: 'pablo1@gmail.com',
      createdat: new Date()
    },
    {
      id: 2,
      firstname: 'Nicolás',
      lastname: 'Girone',
      email: 'nicolas1@gmail.com',
      createdat: new Date()
    },
  ]

  constructor (private matDialog: MatDialog) {}

  openDialog(): void {
    this.matDialog.open(UserDialogComponent).afterClosed().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.users = [...this.users, resultado]
        }
      },
      
    });
  }
}
