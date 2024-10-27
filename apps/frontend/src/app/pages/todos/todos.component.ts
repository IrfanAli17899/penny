import { Component, inject } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { Store } from '@ngrx/store';
import { selectTodos, selectTodosActionState } from '../../store/todos/todos.selectors';
import { AsyncPipe } from '@angular/common';
import * as TodoActions from '../../store/todos/todos.actions'
@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [NzTableModule, NzSpaceModule, NzButtonModule, NzInputModule, NzSelectModule, NzTagModule, CreateTodoComponent, AsyncPipe],
  templateUrl: './todos.component.html',
})
export class TodosPageComponent {
  store = inject(Store);
  todos$ = this.store.select(selectTodos)
  todosActionsState$ = this.store.select(selectTodosActionState)

  constructor() {
    this.store.dispatch(TodoActions.initTodos())
  }

  onItemChecked(id: string, checked: boolean): void {
    this.store.dispatch(TodoActions.updateTodo({ todo: { _id: id, completed: checked } }));
  }

  deleteTodo(id: string): void {
    this.store.dispatch(TodoActions.deleteTodo({ _id: id }));
  }
}
