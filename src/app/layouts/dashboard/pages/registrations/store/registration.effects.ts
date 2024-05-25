import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, } from 'rxjs/operators';
import { RegistrationActions } from './registration.actions';
import { RegistrationService } from '../../../../../core/services/registration-service.service';

@Injectable()
export class RegistrationEffects {
  loadRegistrations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegistrationActions.loadRegistrations),
      mergeMap(() =>
        this.registrationService.getRegistration().pipe(
          map((registrations) => RegistrationActions.loadRegistrationsSuccess({ data: registrations })),
          catchError((error) => {
            console.error('Error loading registrations:', error);
            return of(RegistrationActions.loadRegistrationsFailure({ error }));
          })
        )
      )
    )
  );
  

  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService
  ) {}
}
