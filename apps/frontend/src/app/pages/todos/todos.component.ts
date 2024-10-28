import { Component, inject, ViewChild, OnChanges, SimpleChanges, signal, WritableSignal, effect, computed, OnInit } from '@angular/core';
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
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop'; // For signal to observable conversion

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [NzTableModule, NzSpaceModule, NzButtonModule, NzInputModule, NzSelectModule, NzTagModule, CreateTodoComponent, AsyncPipe, FormsModule],
  templateUrl: './todos.component.html',
})
export class TodosPageComponent implements OnInit {
  store = inject(Store);
  todos$ = this.store.select(TodosSelectors.selectTodos)
  todosActionsState$ = this.store.select(TodosSelectors.selectTodosActionState)
  search? = signal('');
  completed?: WritableSignal<boolean>;
  @ViewChild(CreateTodoComponent) drawer!: CreateTodoComponent;

  fetchTodos() {
    this.store.dispatch(TodosActions.initTodos({ search: this.search?.(), filters: { completed: this.completed?.() } }));
  }

  constructor() {
    const searchCompleted = computed(() => ({
      search: this.search?.(),
      completed: this.completed?.()
    }));

    const searchCompleted$ = toObservable(searchCompleted);

    searchCompleted$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        console.log('fetching todos');
        this.fetchTodos();
      });
  }

  ngOnInit() {
    this.fetchTodos()
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
