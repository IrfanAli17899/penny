import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import * as TodosActions from './todos.actions';
import { TodosService } from '../../services/todos/todos.service';

@Injectable()
export class TodosEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodosService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.initTodos),
      switchMap(({ filters }) =>
        this.todoService.fetchTodos({ filters }).then(todos =>
          TodosActions.loadTodosSuccess({ todos: todos.data })
        ).catch(error =>
          TodosActions.loadTodosFailure({ error: error.message })
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.createTodo),
      switchMap(({ todo }) =>
        this.todoService.createTodo(todo).then(todo =>
          TodosActions.createTodoSuccess({ todo })
        ).catch(error =>
          TodosActions.createTodoFailure({ error: error.message })
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.updateTodo),
      switchMap(({ todo }) =>
        this.todoService.updateTodo(todo).then(todo =>
          TodosActions.updateTodoSuccess({ todo })
        ).catch(error =>
          TodosActions.updateTodoFailure({ error: error.message })
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.deleteTodo),
      switchMap((prop) =>
        this.todoService.deleteTodo(prop).then(() =>
          TodosActions.deleteTodoSuccess(prop)
        ).catch(error =>
          TodosActions.deleteTodoFailure({ error: error.message })
        )
      )
    )
  );
}
