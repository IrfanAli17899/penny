import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-page',
  standalone: true,
  imports: [NzFormModule, NzButtonModule, NzInputModule, NzDividerModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forget.component.html',
})

export class ForgetPageComponent {

  isLoading = false;
  passwordVisible = false;

  forgetForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  async submitForm() {
    this.isLoading = true;
    const values = this.forgetForm.getRawValue();
    // await this.auth.login(values)
    this.isLoading = false;
  }

}
