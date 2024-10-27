import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthActionState } from '../../store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { NzAlertModule } from 'ng-zorro-antd/alert';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    NzIconModule,
    ReactiveFormsModule,
    RouterLink,
    NzSpaceModule,
    AsyncPipe,
    NzAlertModule
  ],
  templateUrl: './login.component.html',
})

export class LoginPageComponent {
  private store = inject(Store)
  passwordVisible = false;
  authActionState$ = this.store.select(selectAuthActionState);

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  async submitForm() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.getRawValue();
      this.store.dispatch(AuthActions.login({ credentials }));
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
