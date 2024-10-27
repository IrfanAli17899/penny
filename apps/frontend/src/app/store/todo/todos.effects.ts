import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as TodosActions from './todos.actions';
import * as TodosFeature from './todos.reducer';

@Injectable()
export class TodosEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.initTodos),
      switchMap(() => of(TodosActions.loadTodosSuccess({ todos: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(TodosActions.loadTodosFailure({ error }));
      })
    )
  );
}
