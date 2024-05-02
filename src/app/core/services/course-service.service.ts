import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Curso } from '../models/index-curso';

const COURSES_DB: Curso[] = [
  {
    id: 1,
    name: 'Curso de Angular',
    schedule: '16:00',
    shift: 'Tarde',
  },
  {
    id: 2,
    name: 'Curso de TypeScript',
    schedule: '9:00',
    shift: 'Mañana',
  },
];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  getCourses(): Observable<Curso[]> {
    return of(COURSES_DB).pipe(delay(1500));
  }
}
