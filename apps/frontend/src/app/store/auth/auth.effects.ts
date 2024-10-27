import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import * as AuthActions from './auth.actions';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).then(user =>
          AuthActions.loginSuccess({ user, isAuthenticated: !!user })
        ).catch(error =>
          AuthActions.loginFailure({ error: error.message })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ credentials }) =>
        this.authService.register(credentials).then(user =>
          AuthActions.registerSuccess({ user })
        ).catch(error =>
          AuthActions.registerFailure({ error: error.message })
        )
      )
    )
  );

  checkAuthentication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuthentication),
      switchMap(() =>
        this.authService.fetchUser().then(user =>
          AuthActions.checkAuthenticationSuccess({ user, isAuthenticated: !!user })
        ).catch(() =>
          AuthActions.checkAuthenticationFailure()
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().then(() =>
          AuthActions.logoutSuccess()
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigate(['/auth/login']))
      ),
    { dispatch: false }
  );
}
