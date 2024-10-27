import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer'

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [NzDrawerModule, NzButtonModule, ReactiveFormsModule, NzFormModule, NzButtonModule, NzInputModule],
  templateUrl: './create-todo.component.html',
})
export class CreateTodoComponent {
  visible = false;
  isLoading = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  createForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  async submitForm() {
    this.isLoading = true;
    const values = this.createForm.getRawValue();
    // await this.auth.login(values)
    this.isLoading = false;
  }
}
