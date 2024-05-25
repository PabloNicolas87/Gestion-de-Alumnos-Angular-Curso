import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegistration from './registration.reducer';

export const selectRegistrationState = createFeatureSelector<fromRegistration.State>(
  fromRegistration.registrationFeatureKey
);

export const selectRegistrationList = createSelector(selectRegistrationState, (s) => s.registrations);
export const selectRegistrationError = createSelector(selectRegistrationState, (s) => s.error);
export const selectLoadingRegistration = createSelector(selectRegistrationState, (s) => s.loadingRegistration)
