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
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { Store } from '@ngrx/store';

import { AuthActions, AuthSelectors } from '../../store';
import { CustomValidators, FormBase, ValidationMessagesService } from '../../utils/password-validation.service';


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
    NzAlertModule,
    AsyncPipe
  ],
  templateUrl: './register.component.html',
})

export class RegisterPageComponent extends FormBase {
  private store = inject(Store)
  authActionState$ = this.store.select(AuthSelectors.selectAuthActionState);
  passwordVisible = false;

  constructor(validationMessages: ValidationMessagesService) {
    super(validationMessages);
  }

  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, CustomValidators.passwordStrength()] }),
    confirm_password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    conditions: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  }, {
    validators: CustomValidators.passwordMatch('password', 'confirm_password')
  });

  async submitForm() {
    if (this.registerForm.valid) {
      const { conditions, confirm_password, ...credentials } = this.registerForm.getRawValue();
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
