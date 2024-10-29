import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer'
import { NzIconModule } from 'ng-zorro-antd/icon'

import { Store } from '@ngrx/store';
import { TodosSelectors, Todo, TodosActions } from '../../../../store';
import { AsyncPipe } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';
import { merge } from 'rxjs';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [NzDrawerModule, NzButtonModule, ReactiveFormsModule, NzFormModule, NzButtonModule, NzInputModule, NzIconModule, AsyncPipe],
  templateUrl: './create-todo.component.html',
})
export class CreateTodoComponent {
  visible = false;
  editId: string | null = null;
  private store = inject(Store)
  actions$ = inject(Actions);
  todosActionState$ = this.store.select(TodosSelectors.selectTodosActionState);

  createForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  open(): void {
    this.visible = true;
  }

  edit(todo: Todo): void {
    this.editId = todo._id;
    this.createForm.patchValue({ description: todo.description, title: todo.title });
    this.visible = true;
  }

  close(): void {
    this.createForm.reset();
    this.editId = null;
    this.visible = false;
  }

  constructor() {
    merge(
      this.actions$.pipe(ofType(TodosActions.createTodoSuccess)),
      this.actions$.pipe(ofType(TodosActions.updateTodoSuccess))
    ).subscribe(() => this.close());
  }


  async submitForm() {
    if (this.createForm.valid) {
      const todo = this.createForm.getRawValue();
      if (this.editId) {
        this.store.dispatch(TodosActions.updateTodo({ todo: { ...todo, _id: this.editId } }));
        return;
      }
      this.store.dispatch(TodosActions.createTodo({ todo }));
    } else {
      Object.values(this.createForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
