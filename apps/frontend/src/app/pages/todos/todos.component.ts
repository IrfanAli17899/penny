import { Component, inject, ViewChild, signal, WritableSignal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { CreateTodoComponent } from './components/create-todo/create-todo.component';

import { Store } from '@ngrx/store';

import { GetTodosInput, Todo, TodosActions, TodosSelectors } from '../../store';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
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
  todosMeta$ = this.store.select(TodosSelectors.selectTodosMeta)
  search? = signal('');
  pagination? = signal({ page: 1, limit: 10 });
  completed?: WritableSignal<boolean | string> = signal("all");

  @ViewChild(CreateTodoComponent) drawer!: CreateTodoComponent;

  fetchTodos(query: GetTodosInput) {
    this.store.dispatch(TodosActions.initTodos(query));
  }

  constructor() {
    const searchCompleted = computed(() => ({
      search: this.search?.() === "" ? undefined : this.search?.(),
      filters: {
        completed: this.completed?.() === "all" ? undefined : this.completed?.() as boolean
      },
      pagination: this.pagination?.()
    }));

    const searchCompleted$ = toObservable(searchCompleted);

    searchCompleted$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((props) => {
        this.fetchTodos(props);
      });
  }

  ngOnInit() {
    this.fetchTodos({})
  }

  onQueryParamsChange($event: NzTableQueryParams) {
    this.pagination?.set({ page: $event.pageIndex, limit: $event.pageSize });
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
