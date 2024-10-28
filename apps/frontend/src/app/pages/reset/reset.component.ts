import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-reset-page',
  standalone: true,
  imports: [NzFormModule, NzButtonModule, NzInputModule, NzDividerModule, ReactiveFormsModule, RouterLink, NzIconModule],
  templateUrl: './reset.component.html',
})

export class ResetPageComponent {

  isLoading = false;
  passwordVisible = false;

  resetForm = new FormGroup({
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    confirm_password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  async submitForm() {
    this.isLoading = true;
    const values = this.resetForm.getRawValue();
    // await this.auth.login(values)
    this.isLoading = false;
  }

}
