import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './my-form.component.html',
  styleUrl: './my-form.component.scss',
})
export class MyFormComponent implements OnInit {
  public myForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.myForm.controls['firstName'].markAsDirty();
    this.myForm.controls['email'].markAsDirty();
    this.myForm.controls['firstName'].markAsTouched();
    this.myForm.controls['email'].markAsTouched();
    this.myForm.controls['firstName'].updateValueAndValidity();
    this.myForm.controls['email'].updateValueAndValidity();
  }

  public onFill(): void {
    this.myForm.controls['firstName'].setValue('Cyril');
    this.myForm.controls['email'].setValue('Cyril@gmail.com');
  }
  public onReset(): void {
    this.myForm.reset();
  }
  public onSubmit(): void {
    if (this.myForm.valid) {
    }
  }
}
