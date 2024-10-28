import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ResetPasswordGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!state.root.queryParams["token"]) {
            this.router.navigateByUrl(`/auth/login`);
            return false;
        }
        return true
    }

}
