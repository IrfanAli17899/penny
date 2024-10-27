import { createAction, props } from '@ngrx/store';
import { LoginInput, RegisterInput, IUser } from '../../models';

export const login = createAction('[Auth] Login', props<{ credentials: LoginInput }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: IUser | null, isAuthenticated: boolean }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const register = createAction('[Auth] Register', props<{ credentials: RegisterInput }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: IUser }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const checkAuthentication = createAction('[Auth] Check Authentication');
export const checkAuthenticationSuccess = createAction('[Auth] Check Authentication Success', props<{ user: IUser | null, isAuthenticated: boolean }>());
export const checkAuthenticationFailure = createAction('[Auth] Check Authentication Failure');
