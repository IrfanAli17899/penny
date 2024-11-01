import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { AuthService } from '../../services';

@Component({
  selector: 'app-forget-page',
  standalone: true,
  imports: [
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    ReactiveFormsModule,
    NzResultModule,
    RouterLink,
    NzAlertModule
  ],
  templateUrl: './forget.component.html',
})

export class ForgetPageComponent {
  authService = inject(AuthService);
  isLoading = false;
  passwordVisible = false;
  sentEmail = false;
  error: string | null = null

  forgetForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  async submitForm() {
    this.error = null;
    if (this.forgetForm.valid) {
      try {
        this.isLoading = true;
        const credentials = this.forgetForm.getRawValue();
        await this.authService.forgetPassword(credentials);
        this.sentEmail = true;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    } else {
      Object.values(this.forgetForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
