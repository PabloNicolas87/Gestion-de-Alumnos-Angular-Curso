import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RegistrationDialogComponent } from '../registrations/components/registration-dialog/registration-dialog.component';
import { RegistrationService } from '../../../../core/services/registration-service.service';
import { Inscripciones } from '../../../../core/models/index-inscripciones';
import { CoursesService } from '../../../../core/services/course-service.service';
import { UsersService } from '../../../../core/services/user-service.service';
import { Usuario } from '../../../../core/models/index-usuario';
import { Curso } from '../../../../core/models/index-curso';
import { Store } from '@ngrx/store';
import { selectRegistrationList, selectLoadingRegistration, selectRegistrationError } from './store/registration.selectors';
import { RegistrationActions } from './store/registration.actions';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'user', 'course', 'actions'];
  registration: Inscripciones[] = [];
  users: Usuario[] = [];
  courses: Curso[] = [];
  
  loadingRegistrations$: Observable<boolean>;
  error$: Observable<unknown>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private registrationService: RegistrationService,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private matDialog: MatDialog,
    private store: Store
  ) {
    this.loadingRegistrations$ = this.store.select(selectLoadingRegistration);
    this.error$ = this.store.select(selectRegistrationError);
  }

  ngOnInit(): void {
    this.loadRegistrations();
    this.loadCourses();
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
                this.registration = this.registration.map(reg => reg.id === updatedReg.id ? updatedReg : reg); // Actualizar array con spread operator
                Swal.fire('¡Usuario actualizado!', '', 'success');
              });
            } else if (result.isDenied) {
              Swal.fire('Los cambios no fueron guardados', '', 'info');
            }
          });
        } else {
          this.registrationService.createRegistration(resultado).subscribe(newReg => {
            this.registration = [...this.registration, newReg];  // Agregar nuevo objeto con spread operator
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
            this.registration = this.registration.filter(reg => reg.id !== id);  // Eliminar objeto con filter
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
    console.log('Dispatching loadRegistrations action...');
    this.store.dispatch(RegistrationActions.loadRegistrations());
    this.store.select(selectRegistrationList).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (registrations) => {
        console.log('Registrations loaded from store:', registrations);
        this.registration = registrations;
      },
      error: (err) => {
        console.error('Error loading registrations from store:', err);
      },
      complete: () => {
        console.log('Registrations subscription completed.');
      }
    });
  }
}

