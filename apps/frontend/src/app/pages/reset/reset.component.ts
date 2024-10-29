import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { AuthService } from '../../services';
import { CustomValidators, FormBase, ValidationMessagesService } from '../../utils/password-validation.service';

export const passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  if (!(formGroup instanceof FormGroup)) {
    return null;
  }

  const password = formGroup.get('password');
  const confirmPassword = formGroup.get('confirm_password');

  if (!password || !confirmPassword) {
    return null;
  }

  if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    confirmPassword.setErrors(null);
    return null;
  }
};

@Component({
  selector: 'app-reset-page',
  standalone: true,
  imports: [
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    ReactiveFormsModule,
    RouterLink,
    NzIconModule,
    NzResultModule,
    NzAlertModule
  ],
  templateUrl: './reset.component.html',
})

export class ResetPageComponent extends FormBase implements OnInit {
  authService = inject(AuthService);
  resetPassword = false;
  isLoading = false;
  passwordVisible = false;
  token: string | null = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, validationMessages: ValidationMessagesService) {
    super(validationMessages);
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  resetForm = new FormGroup({
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, CustomValidators.passwordStrength()] }),
    confirm_password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  }, {
    validators: CustomValidators.passwordMatch('password', 'confirm_password')
  });

  async submitForm() {
    this.error = null;
    if (this.resetForm.valid && this.token) {
      try {
        this.isLoading = true;
        const credentials = this.resetForm.getRawValue();
        await this.authService.resetPassword({ password: credentials.password, token: this.token });
        this.resetPassword = true;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    } else {
      Object.values(this.resetForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
