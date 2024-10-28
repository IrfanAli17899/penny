import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { Store } from '@ngrx/store';

import { AuthActions, AuthSelectors } from '../../store';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    ReactiveFormsModule,
    RouterLink,
    NzSpaceModule,
    NzCheckboxModule,
    NzIconModule,
    AsyncPipe
  ],
  templateUrl: './register.component.html',
})

export class RegisterPageComponent {
  private store = inject(Store)
  authActionState$ = this.store.select(AuthSelectors.selectAuthActionState);
  passwordVisible = false;

  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    conditions: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  async submitForm() {
    if (this.registerForm.valid) {
      const { conditions, ...credentials } = this.registerForm.getRawValue();
      this.store.dispatch(AuthActions.register({ credentials }));
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
