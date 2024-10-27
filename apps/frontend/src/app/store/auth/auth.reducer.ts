import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IUser } from './auth.models';

export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null,
    isLoading: false
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    isAuthenticated: false,
    error,
    isLoading: false
  })),
  on(AuthActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.checkAuthenticationSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: !!user,
    error: null
  }))
);
