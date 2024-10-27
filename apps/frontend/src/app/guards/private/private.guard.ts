import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (await this.authService.checkAuthentication()) {
      return true;
    } else {
      this.router.navigateByUrl(`/auth/login?returnTo=${state.url}`);
      return false;
    }
  }
}