import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';

import { SharedModule } from '../../../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent
    
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    MatProgressSpinnerModule
  ]
})
export class CoursesModule { }
