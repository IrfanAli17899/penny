import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [NzFormModule, NzButtonModule, NzInputModule, NzDividerModule, NzIconModule, ReactiveFormsModule, RouterLink, NzSpaceModule, NzCheckboxModule],
  templateUrl: './register.component.html',
})

export class RegisterPageComponent {
  private auth = inject(AuthService)
  private message = inject(NzMessageService)
  isLoading = false;
  passwordVisible = false;

  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    conditions: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  async submitForm() {
    if (this.registerForm.valid) {
      try {
        this.isLoading = true;
        const values = this.registerForm.getRawValue();
        await this.auth.register(values)
      } catch (error: any) {
        this.message.error(error.message)
      } finally {
        this.isLoading = false;
      }
    } else {
      Object.values(this.registerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
