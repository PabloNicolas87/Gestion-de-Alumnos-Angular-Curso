import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../../core/models/index-curso';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CoursesService } from '../../../../core/services/course-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'schedule', 'shift', 'actions'];
  loading = true;
  courses: Curso[] = [];

  constructor(private matDialog: MatDialog, private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (err) => {},
      complete: () => {
      }
    });
  }

  openDialog(editingCourses?: Curso): void {
    const dialogRef = this.matDialog.open(CourseDialogComponent, {
      data: editingCourses,
    });
  
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (editingCourses) {
          Swal.fire({
            title: "Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No Guardar`
          }).then((result) => {
            if (result.isConfirmed) {
              this.coursesService.updateCourses(editingCourses.id, resultado).subscribe(updatedCourses => {
                const index = this.courses.findIndex(c => c.id === updatedCourses.id);
                if (index !== -1) {
                  this.courses[index] = updatedCourses;
                  this.loadCourses();
                  Swal.fire("Usuario actualizado!", "", "success");
                }
              });
            } else if (result.isDenied) {
              Swal.fire("Los cambios no fueron guardados", "", "info");
            }
          });
        } else {
          this.coursesService.createCourses(resultado).subscribe({
            next: (courseCreated) => {
              this.courses = [...this.courses, courseCreated]
            }
          });
          Swal.fire({
            icon: 'success',
            title: 'Curso creado',
            text: 'El curso ha sido creado exitosamente.',
          });
        }
      }
    });
  }
  
  

  onDeleteCourse(id: number): void {
    Swal.fire({
      title: '¿Estás seguro que deseas borrar este curso?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.deleteCourses(id).subscribe({
          next: () => {
            this.courses = this.courses.filter(course => course.id !== id);
            Swal.fire(
              'Curso borrado',
              'El curso ha sido borrado exitosamente.',
              'success'
            );
          },
          error: (err) => {
            console.error('Error deleting course:', err);
          }
        });
      }
    });
  }

}
