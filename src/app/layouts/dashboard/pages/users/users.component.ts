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
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'createdat', 'role', 'actions'];

  users: Usuario[] = [
    {
      id: 1,
      firstname: 'Pablo',
      lastname: 'Girone',
      email: 'pablo1@gmail.com',
      createdat: new Date(),
      role: 'ADMIN'
    },
    {
      id: 2,
      firstname: 'Nicolás',
      lastname: 'Girone',
      email: 'nicolas1@gmail.com',
      createdat: new Date(),
      role: 'USER'
    },
  ]

  constructor (private matDialog: MatDialog) {}

  openDialog(editingUser?: Usuario): void {
    this.matDialog.open(UserDialogComponent, {
      data: editingUser,
    }).afterClosed().subscribe({
      next: (resultado) => {
        if (resultado) {
          if(editingUser) {
            this.users = this.users.map( (u) => u.id === editingUser.id ? {...u, ...resultado} : u )
          } else {
            resultado.id = new Date().getTime();
            resultado.createdat = new Date();
            this.users = [...this.users, resultado]
          }
        }
      },
      
    });
  }

  onDeleteUser(id: number): void {
    this.users = this.users.filter((u) => u.id != id)
  }
}
