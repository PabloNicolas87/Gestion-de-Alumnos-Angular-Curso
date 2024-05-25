import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { RegistrationsComponent } from './registrations.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from '../../../../shared/shared.module';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { RegistrationEffects } from './store/registration.effects';
import { StoreModule } from '@ngrx/store';
import { registrationFeature } from './store/registration.reducer';



@NgModule({
  declarations: [
    RegistrationsComponent,
    RegistrationDialogComponent
  ],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    MatProgressSpinnerModule,
    SharedModule,
    StoreModule.forFeature(registrationFeature),
    EffectsModule.forFeature([RegistrationEffects])
  ]
})
export class RegistrationsModule { }
