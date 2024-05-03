import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { RegistrationsComponent } from './registrations.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    RegistrationsComponent
  ],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class RegistrationsModule { }
