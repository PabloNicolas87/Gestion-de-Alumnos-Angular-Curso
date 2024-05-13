import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RegistrationDialogComponent } from '../registrations/components/registration-dialog/registration-dialog.component';
import { RegistrationService } from '../../../../core/services/registration-service.service';
import { Inscripciones } from '../../../../core/models/index-inscripciones';
import { CoursesService } from '../../../../core/services/course-service.service';
import { UsersService } from '../../../../core/services/user-service.service';
import { Usuario } from '../../../../core/models/index-usuario';
import { Curso } from '../../../../core/models/index-curso';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'user', 'course', 'actions'];
  registration: Inscripciones[] = [];
  users: Usuario[] = [];
  courses: Curso[] = [];
  isLoading = false;

  constructor(
    private registrationService: RegistrationService,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadRegistrations();
    this.loadCourses();
    this.loadUsers();
  }

  openDialog(editingReg?: Inscripciones): void {
    const dialogRef = this.matDialog.open(RegistrationDialogComponent, {
      data: {
        editingReg: editingReg,
        users: this.users,
        courses: this.courses
      }
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (editingReg) {
          Swal.fire({
            title: '¿Deseas guardar los cambios?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            denyButtonText: 'No Guardar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.registrationService.updateRegistration(editingReg.id, resultado as Inscripciones).subscribe(updatedReg => {
                const index = this.registration.findIndex(reg => reg.id === editingReg.id);
                if (index !== -1) {
                  this.loadRegistrations();
                  Swal.fire('¡Usuario actualizado!', '', 'success');
                }
              });
            } else if (result.isDenied) {
              Swal.fire('Los cambios no fueron guardados', '', 'info');
            }
          });
        } else {
          this.registrationService.createRegistration(resultado).subscribe(newReg => {
            this.registration.push(newReg);
            this.loadRegistrations();
            Swal.fire({
              icon: 'success',
              title: 'Curso creado',
              text: 'El curso ha sido creado exitosamente.'
            });
          });
        }
      }
    });
  }

  deleteRegistration(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.registrationService.deleteRegistration(id).subscribe({
          next: () => {
            this.registration = this.registration.filter(reg => reg.id !== id);
            Swal.fire('¡Borrado!', 'La inscripción ha sido eliminada.', 'success');
          },
          error: (err) => {
            console.error('Error al borrar la inscripción:', err);
            Swal.fire('Error', 'Ha ocurrido un error al intentar borrar la inscripción.', 'error');
          }
        });
      }
    });
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {}
    });
  }
  
  loadCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {}
    });
  }

  loadRegistrations(): void {
    this.isLoading = true;
    this.registrationService.getRegistration().subscribe({
      next: (registration) => {
        this.registration = registration;
      },
      error: (err) => {},
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
}