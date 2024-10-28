import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from './todos.reducer';

export const selectTodosState =
  createFeatureSelector<TodosState>("todos");

export const selectTodos = createSelector(
  selectTodosState,
  (state: TodosState) => state.todos
);

export const selectTodosMeta = createSelector(
  selectTodosState,
  ({ meta }) => meta
);

export const selectTodosActionState = createSelector(
  selectTodosState,
  ({ error, loading }) => ({ error, loading })
);
