import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../core/models/index-usuario';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { UsersService } from '../../../../core/services/user-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName' , 'email', 'birth', 'actions'];

  loading = true;

  users: Usuario[] = [];

  constructor(private matDialog: MatDialog, private userService: UsersService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {},
      complete: () => {
        this.loading = false;
      }
    })
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {},
      complete: () => {
      }
    });
  }

  openDialog(editingUser?: Usuario): void {
    const dialogRef = this.matDialog.open(UserDialogComponent, {
      data: editingUser,
    });
  
    dialogRef.afterClosed().subscribe((resultado) => {
      console.log(resultado);
      if (resultado) {
        if (editingUser) {
          Swal.fire({
            title: "¿Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: "No Guardar"
          }).then((result) => {
            if (result.isConfirmed) {
              this.userService.updateUser(editingUser.id, resultado).subscribe(updatedUser => {
                const index = this.users.findIndex(u => u.id === updatedUser.id);
                if (index !== -1) {
                  this.users[index] = updatedUser;
                  this.loadUsers();
                  Swal.fire("Usuario actualizado!", "", "success");
                }
              });
            } else if (result.isDenied) {
              Swal.fire("Los cambios no fueron guardados", "", "info");
            }
          });
        }
         else {
          this.userService.createUsers(resultado).subscribe({
            next: (userCreated) => {
              this.users = [...this.users, userCreated]
            }
          });

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
    confirmButtonText: 'Si, borrar usuario!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
        Swal.fire('Usuario borrado', 'El usuario ha sido borrado exitosamente.', 'success');
      });
    }
  });
}

}
