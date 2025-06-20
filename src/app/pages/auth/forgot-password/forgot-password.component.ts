import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { AuthService, ForgotPasswordRequest } from '../../../core/services/auth.service';
import { FormFieldErrorComponent } from '../../../shared/components/form-field-error/form-field-error.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    FormFieldErrorComponent,
    CommonModule
  ]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: UntypedFormGroup;
  submittingForm = false;
  emailSent = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.submittingForm = true;
    const request: ForgotPasswordRequest = this.forgotPasswordForm.value;

    this.authService.forgotPassword(request).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.emailSent = true;
      },
      error: (error) => {
        this.toastr.error(error.message || 'Erro ao enviar email');
        this.submittingForm = false;
      },
      complete: () => {
        this.submittingForm = false;
      }
    });
  }

  backToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  resendEmail(): void {
    this.emailSent = false;
    this.submittingForm = false;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }
} 