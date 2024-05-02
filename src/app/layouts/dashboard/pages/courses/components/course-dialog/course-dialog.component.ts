import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from '../../../../../../core/models/index-curso';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingCourse?: Curso
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      schedule: ['', Validators.required],
      shift: ['', Validators.required],
    });

    if (editingCourse) {
      this.formGroup.patchValue(editingCourse);
    }
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const formData = this.formGroup.value;

    this.matDialogRef.close(formData);
  }
}
