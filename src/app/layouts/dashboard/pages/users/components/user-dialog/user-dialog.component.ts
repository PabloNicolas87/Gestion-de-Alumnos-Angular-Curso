import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../models';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})

export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,  
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    @Inject( MAT_DIALOG_DATA ) private editingUser?: Usuario
  ){
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      role: ['USER', Validators.required],
    });
    if (editingUser) {
      this.userForm.patchValue(editingUser)
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }
}
