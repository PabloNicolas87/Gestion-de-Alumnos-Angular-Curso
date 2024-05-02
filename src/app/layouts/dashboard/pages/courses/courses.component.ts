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

  openDialog(editinCourses?: Curso): void {
    const dialogRef = this.matDialog.open(CourseDialogComponent, {
      data: editinCourses,
    });
  
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (editinCourses) {
          Swal.fire({
            title: "Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No Guardar`
          }).then((result) => {
            if (result.isConfirmed) {
              this.courses = this.courses.map((u) => u.id === editinCourses.id ? { ...u, ...resultado } : u);
              Swal.fire("Cambios guardados!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Los cambios no fueron guardados", "", "info");
            }
          });
        } else {
          resultado.id = this.courses.length + 1;
          resultado.createdat = new Date();
          this.courses = [...this.courses, resultado];
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
        this.courses = this.courses.filter(course => course.id !== id);
        Swal.fire(
          'Curso borrado',
          'El curso ha sido borrado exitosamente.',
          'success'
        );
      }
    });
  }

}
