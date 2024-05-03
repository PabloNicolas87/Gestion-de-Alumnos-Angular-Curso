import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../../../core/services/registration-service.service';
import { Inscripciones } from '../../../../core/models/index-inscripciones';
import { FormControl, FormGroup } from '@angular/forms';
import { CoursesService } from '../../../../core/services/course-service.service';
import { Curso } from '../../../../core/models/index-curso';
import { UsersService } from '../../../../core/services/user-service.service';
import { Usuario } from '../../../../core/models/index-usuario';
import { InscripcionesFormulario } from '../../../../core/models/index-inscripciones-form';
import { CreateInscripcionesData } from '../../../../core/models/index-inscripciones';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.scss'
})
export class RegistrationsComponent implements OnInit{
  registration: Inscripciones[] = [];
  courses: Curso[] = [];
  users: Usuario[] = [];

  isLoading = false;

  registrationForm = new FormGroup<InscripcionesFormulario>({
    usuario: new FormControl(null),
    curso: new FormControl(null),
  })

  constructor(
    private registrationService: RegistrationService, 
    private coursesService: CoursesService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.loadRegistrations();
    this.loadCourses();
    this.loadUsers();
  }

  createRegistration() {
    this.registrationService.createRegistration(this.registrationForm.getRawValue()).subscribe({
      next: (reg) => {}
    });
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {},
      complete: () => {
      }
    });
  }

  loadCourses() {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {},
      complete: () => {
      }
    });
  }
  

  loadRegistrations() {
    this.isLoading = true;
    this.registrationService.getRegistration().subscribe({
      next: (registration) => {
        this.registration = registration;
      },
      error: (err) => {},
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
