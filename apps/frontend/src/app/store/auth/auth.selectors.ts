import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthActionState = createSelector(
  selectAuthState,
  ({ error, isLoading }) => ({ error, isLoading })
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);