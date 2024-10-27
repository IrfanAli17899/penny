import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root',
})
export class PrivateGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private actions$: Actions) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // Dispatch check authentication
    this.store.dispatch(AuthActions.checkAuthentication());

    // Wait for the checkAuthenticationSuccess action
    return this.actions$.pipe(
      ofType(AuthActions.checkAuthenticationSuccess, AuthActions.checkAuthenticationFailure),
      take(1),
      switchMap(() => this.store.select(selectIsAuthenticated)),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl(`/auth/login?returnTo=${state.url}`);
          return false;
        }
      })
    );
  }

}
