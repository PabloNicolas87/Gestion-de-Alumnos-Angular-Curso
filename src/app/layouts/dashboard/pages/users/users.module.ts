import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
