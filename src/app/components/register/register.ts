import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DonorService } from '../../services/donor';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registrationForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private donorService: DonorService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      blood_group: ['', [Validators.required]],
      city: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      available: [true]
    });
  }

  get name() { return this.registrationForm.get('name'); }
  get email() { return this.registrationForm.get('email'); }
  get phone() { return this.registrationForm.get('phone'); }
  get blood_group() { return this.registrationForm.get('blood_group'); }
  get city() { return this.registrationForm.get('city'); }
  get gender() { return this.registrationForm.get('gender'); }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      this.successMessage = '';
      this.errorMessage = '';

      this.donorService.registerDonor(this.registrationForm.value).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.error) {
            this.errorMessage = 'Registration failed. Please try again.';
          } else {
            this.successMessage = 'Registration successful! Thank you for becoming a donor.';
            this.registrationForm.reset({ available: true });
            setTimeout(() => {
              this.successMessage = '';
            }, 5000);
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = 'An error occurred. Please try again later.';
          console.error('Registration error:', error);
        }
      });
    }
  }
}
