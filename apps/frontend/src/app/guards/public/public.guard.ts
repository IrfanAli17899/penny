import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions

  ) { }

  canActivate(): MaybeAsync<GuardResult> {
    // Dispatch check authentication
    this.store.dispatch(AuthActions.checkAuthentication());

    // Wait for the checkAuthenticationSuccess action
    return this.actions$.pipe(
      ofType(AuthActions.checkAuthenticationSuccess, AuthActions.checkAuthenticationFailure),
      take(1),
      switchMap(() => this.store.select(selectIsAuthenticated)),
      take(1),
      map(isAuthenticated => {
        console.log('Auth state after check completion:', isAuthenticated);
        if (!isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/dashboard');
          return false;
        }
      })
    );
  }
}
