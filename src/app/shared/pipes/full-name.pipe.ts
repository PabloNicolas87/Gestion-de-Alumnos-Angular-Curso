import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../../layouts/dashboard/pages/users/models/index';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(usuario: Usuario): string {
    return `${usuario.firstname} ${usuario.lastname}`;
  }
}

