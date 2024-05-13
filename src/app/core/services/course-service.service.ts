import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { CreateCoursePayload, Curso } from '../models/index-curso';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) {}

  getCourses(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(environment.baseAPIURL + '/courses').pipe(delay(1500));
  }

  createCourses(payload: CreateCoursePayload): Observable<Curso> {
    return this.httpClient.post<Curso>(environment.baseAPIURL + '/courses/', payload)
  }

  deleteCourses(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseAPIURL}/courses/${id}`);
  }

  updateCourses(id: number, payload: any): Observable<Curso> {
    return this.httpClient.put<Curso>(`${environment.baseAPIURL}/courses/${id}`, payload);
  }
}
