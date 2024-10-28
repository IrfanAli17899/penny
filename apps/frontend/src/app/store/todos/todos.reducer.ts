import { createReducer, on, Action } from '@ngrx/store';

import * as TodosActions from './todos.actions';
import { GetTodosResponse, Todo } from './todos.models';

export interface TodosState {
  todos: Todo[];
  meta: Omit<GetTodosResponse, "data"> | null;
  loading: boolean;
  error?: string | null;
}

export const initialTodosState: TodosState = {
  todos: [],
  meta: null,
  error: null,
  loading: false,
};

export const todosReducer = createReducer(
  initialTodosState,
  on(TodosActions.initTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodosActions.loadTodosSuccess, (state, { data, type, ...meta }) => ({
    ...state,
    todos: data,
    meta,
    loading: false,
    error: null
  })
  ),
  on(TodosActions.loadTodosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TodosActions.createTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodosActions.createTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false,
    error: null
  })),
  on(TodosActions.createTodoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TodosActions.updateTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodosActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map(t => {
      if (t._id === todo._id) {
        return { ...t, ...todo };
      }
      return t;
    }),
    loading: false,
    error: null
  })),
  on(TodosActions.updateTodoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(TodosActions.deleteTodo, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodosActions.deleteTodoSuccess, (state, { _id }) => ({
    ...state,
    todos: state.todos.filter(t => t._id !== _id),
    loading: false,
    error: null
  })),
  on(TodosActions.deleteTodoFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
