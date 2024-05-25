import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscripciones } from '../../../../../core/models/index-inscripciones';

export const RegistrationActions = createActionGroup({
  source: 'Registration',
  events: {
    'Load Registrations': emptyProps(),
    'Load Registrations Success': props<{ data: Inscripciones[] }>(),
    'Load Registrations Failure': props<{ error: unknown }>(),
  }
});
