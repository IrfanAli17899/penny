import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

import { AuthActions, AuthSelectors } from '../../store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    ReactiveFormsModule,
    RouterLink,
    NzSpaceModule,
    NzIconModule, 
    AsyncPipe
  ],
  templateUrl: './login.component.html',
})

export class LoginPageComponent {
  private store = inject(Store)
  passwordVisible = false;
  authActionState$ = this.store.select(AuthSelectors.selectAuthActionState);

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
