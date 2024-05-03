import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Inscripciones } from '../models/index-inscripciones';
import { CreateInscripcionesData } from '../models/index-inscripciones';

let INSCRIPCIONES_DB = [
  {
    id: 1,
    usuario: {
      id: 1,
      firstname: 'user1',
      lastname: 'apellidouser1',
      birth: new Date('12/9/1978'),
      email: 'user1@user1.com',
    },
    curso: {
      id: 2,
      name: 'Curso de TypeScript',
      schedule: '9:00',
      shift: 'Mañana',
    }
  }
]

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  getRegistration(): Observable<Inscripciones[]> {
    return of(INSCRIPCIONES_DB).pipe(delay(1500))
  }

  createRegistration(data: CreateInscripcionesData) {

    if (data.curso && data.usuario) {
      const newId = this.generateNewId();
      const newRegistration: Inscripciones = {
        id: newId,
        usuario: data.usuario,
        curso: data.curso,
        
      }
      INSCRIPCIONES_DB.push(newRegistration);
    }
    return of (INSCRIPCIONES_DB);
  }

  deleteRegistration(id: number) {
    return of(INSCRIPCIONES_DB.filter((registration) => registration.id != id));
  }

  updateRegistration(id: number, data: Inscripciones) {
    return of (
      INSCRIPCIONES_DB.map((registration) => (registration.id === id ? {...registration, ...data} : registration))
    );
  }
  private generateNewId(): number {
    const maxId = Math.max(...INSCRIPCIONES_DB.map(registration => registration.id), 0);
    return maxId + 1;
  }
}
