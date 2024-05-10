import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {
  formGroup!: FormGroup;
  users: any[] = [];
  courses: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.users = this.data.users || [];
    this.courses = this.data.courses || [];

    this.formGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      curso: ['', Validators.required],
    });

    if (this.data.editingReg) {
      this.formGroup.patchValue(this.data.editingReg);
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
