import { createReducer, on } from '@ngrx/store';
import { RegistrationActions } from './registration.actions';
import { Inscripciones } from '../../../../../core/models/index-inscripciones';

export const registrationFeatureKey = 'registration';

export interface State {
  loadingRegistration: boolean;
  registrations: Inscripciones[];
  error: unknown;
}

export const initialState: State = {
  loadingRegistration: false,
  registrations: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(RegistrationActions.loadRegistrations, (state) => {
    return {
      ...state,
      loadingRegistration: true,
    }
    
  }),
  on(RegistrationActions.loadRegistrationsSuccess, (state, action) => ({
    ...state,
    registrations: action.data,
    loadingRegistration: false,
  })),
  on(RegistrationActions.loadRegistrationsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingRegistration: false,
    }
    
  })
);

export const registrationFeature = {
  name: registrationFeatureKey,
  reducer
};
