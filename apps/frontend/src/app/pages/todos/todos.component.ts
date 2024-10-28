import { Component, inject, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { CreateTodoComponent } from './components/create-todo/create-todo.component';

import { Store } from '@ngrx/store';

import { Todo, TodosActions, TodosSelectors } from '../../store';
@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [NzTableModule, NzSpaceModule, NzButtonModule, NzInputModule, NzSelectModule, NzTagModule, CreateTodoComponent, AsyncPipe, FormsModule],
  templateUrl: './todos.component.html',
})
export class TodosPageComponent implements OnChanges {
  store = inject(Store);
  todos$ = this.store.select(TodosSelectors.selectTodos)
  todosActionsState$ = this.store.select(TodosSelectors.selectTodosActionState)
  search? = '';
  completed?: boolean;
  @ViewChild(CreateTodoComponent) drawer!: CreateTodoComponent;

  fetchTodos() {
    this.store.dispatch(TodosActions.initTodos({ filters: { completed: this.completed } }));
  }

  constructor() {
    this.fetchTodos()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search'] || changes['completed']) {
      this.fetchTodos();
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.store.dispatch(TodosActions.updateTodo({ todo: { _id: id, completed: checked } }));
  }

  deleteTodo(id: string): void {
    this.store.dispatch(TodosActions.deleteTodo({ _id: id }));
  }

  editTodo(todo: Todo): void {
    this.drawer.edit(todo);
  }
}
