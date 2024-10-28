import { createAction, props } from '@ngrx/store';
import { CreateTodoInput, DeleteTodoInput, GetTodosInput, Todo, UpdateTodoInput } from './todos.models';

export const initTodos = createAction('[Todos] Init', props<GetTodosInput>());
export const loadTodosSuccess = createAction('[Todos] Load Todos Success', props<{ todos: Todo[] }>());
export const loadTodosFailure = createAction('[Todos] Load Todos Failure', props<{ error: any }>());

export const createTodo = createAction('[Todos] Create Todo', props<{ todo: CreateTodoInput }>());
export const createTodoSuccess = createAction('[Todos] Create Todo Success', props<{ todo: Todo }>());
export const createTodoFailure = createAction('[Todos] Create Todo Failure', props<{ error: any }>());

export const updateTodo = createAction('[Todos] Update Todo', props<{ todo: UpdateTodoInput }>());
export const updateTodoSuccess = createAction('[Todos] Update Todo Success', props<{ todo: UpdateTodoInput }>());
export const updateTodoFailure = createAction('[Todos] Update Todo Failure', props<{ error: any }>());

export const deleteTodo = createAction('[Todos] Delete Todo', props<DeleteTodoInput>());
export const deleteTodoSuccess = createAction('[Todos] Delete Todo Success', props<DeleteTodoInput>());
export const deleteTodoFailure = createAction('[Todos] Delete Todo Failure', props<{ error: any }>());
