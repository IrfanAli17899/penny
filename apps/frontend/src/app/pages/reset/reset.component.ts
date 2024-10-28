import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';

import { AuthService } from '../../services';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-reset-page',
  standalone: true,
  imports: [NzFormModule, NzButtonModule, NzInputModule, NzDividerModule, ReactiveFormsModule, RouterLink, NzIconModule, NzResultModule],
  templateUrl: './reset.component.html',
})

export class ResetPageComponent implements OnInit {
  authService = inject(AuthService);
  resetPassword = false;
  isLoading = false;
  passwordVisible = false;
  token: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  resetForm = new FormGroup({
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    confirm_password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  async submitForm() {
    if (this.resetForm.valid && this.token) {
      try {
        this.isLoading = true;
        const credentials = this.resetForm.getRawValue();
        await this.authService.resetPassword({ password: credentials.password, token: this.token });
        this.resetPassword = true;
      } catch (error) {
        //        
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
