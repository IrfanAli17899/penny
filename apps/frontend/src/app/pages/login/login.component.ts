import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NzFormModule, NzButtonModule, NzInputModule, NzDividerModule, NzIconModule, ReactiveFormsModule, RouterLink, NzSpaceModule],
  templateUrl: './login.component.html',
})

export class LoginPageComponent {
  private auth = inject(AuthService)
  private message = inject(NzMessageService)
  isLoading = false;
  passwordVisible = false;

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  async submitForm() {
    if (this.loginForm.valid) {
      try {
        this.isLoading = true;
        const values = this.loginForm.getRawValue();
        await this.auth.login(values)
      } catch (error: any) {
        this.message.error(error.message)
      } finally {
        this.isLoading = false;
      }
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  eyeClicked() {
    this.passwordVisible = !this.passwordVisible;
  }

}
