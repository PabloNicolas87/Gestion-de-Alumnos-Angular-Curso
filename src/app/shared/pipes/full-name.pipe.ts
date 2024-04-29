import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../../core/models/index';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(usuario: Usuario): string {
    return `${usuario.firstname} ${usuario.lastname}`;
  }
}

