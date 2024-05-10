import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Inscripciones, CreateInscripcionesData } from '../models/index-inscripciones';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) {}

  getRegistration(): Observable<Inscripciones[]> {
    return this.httpClient.get<Inscripciones[]>(`${environment.baseAPIURL}/registrations`);
  }

  createRegistration(data: CreateInscripcionesData): Observable<Inscripciones> {
    return this.httpClient.post<Inscripciones>(`${environment.baseAPIURL}/registrations`, data);
  }

  deleteRegistration(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseAPIURL}/registrations/${id}`);
  }

  updateRegistration(id: number, data: any): Observable<Inscripciones> {
    return this.httpClient.put<Inscripciones>(`${environment.baseAPIURL}/registrations/${id}`, data);
  }  
  
}
