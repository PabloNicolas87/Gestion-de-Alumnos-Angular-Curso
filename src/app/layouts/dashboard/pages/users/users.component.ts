import { Component } from '@angular/core';
import { Usuario } from './models/index';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent {
  displayedColumns: string[] = ['id', 'fullName' , 'email', 'birth', 'actions'];

  users: Usuario[] = [
    {
      id: 1,
      firstname: 'Pablo',
      lastname: 'Girone',
      email: 'pablo1@gmail.com',
      birth: new Date('12/8/1988')
    },
    {
      id: 2,
      firstname: 'Nicolás',
      lastname: 'Girone',
      email: 'nicolas1@gmail.com',
      birth: new Date('02/12/1998')
    },
  ]

  constructor (private matDialog: MatDialog) {}

  openDialog(editingUser?: Usuario): void {
    const dialogRef = this.matDialog.open(UserDialogComponent, {
      data: editingUser,
    });
  
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (editingUser) {
          Swal.fire({
            title: "Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No Guardar`
          }).then((result) => {
            if (result.isConfirmed) {
              this.users = this.users.map((u) => u.id === editingUser.id ? { ...u, ...resultado } : u);
              Swal.fire("Cambios guardados!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Los cambios no fueron guardados", "", "info");
            }
          });
        } else {
          resultado.id = this.users.length + 1;
          resultado.createdat = new Date();
          this.users = [...this.users, resultado];
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: 'El usuario ha sido creado exitosamente.',
          });
        }
      }
    });
  }
  

onDeleteUser(id: number): void {
  Swal.fire({
    title: 'Estás seguro que quieres borrar el usuario?',
    text: "Esta opción es definitiva",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar usuario!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.users = this.users.filter((u) => u.id != id);
      Swal.fire(
        'El usuario ha sido borrado.',
        'success'
      );
    }
  });
}

}
