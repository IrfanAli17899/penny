import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import { TodosEntity } from './todos.models';

export const TODOS_FEATURE_KEY = 'todos';

export interface TodosState extends EntityState<TodosEntity> {
  selectedId?: string | number; // which Todos record has been selected
  loaded: boolean; // has the Todos list been loaded
  error?: string | null; // last known error (if any)
}

export interface TodosPartialState {
  readonly [TODOS_FEATURE_KEY]: TodosState;
}

export const todosAdapter: EntityAdapter<TodosEntity> =
  createEntityAdapter<TodosEntity>();

export const initialTodosState: TodosState = todosAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialTodosState,
  on(TodosActions.initTodos, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TodosActions.loadTodosSuccess, (state, { todos }) =>
    todosAdapter.setAll(todos, { ...state, loaded: true })
  ),
  on(TodosActions.loadTodosFailure, (state, { error }) => ({ ...state, error }))
);

export function todosReducer(state: TodosState | undefined, action: Action) {
  return reducer(state, action);
}
