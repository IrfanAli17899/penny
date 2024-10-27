import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { selectUser } from '../../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import * as AuthActions from '../../store/auth/auth.actions';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterModule,
    NzLayoutModule,
    NzTypographyModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NzDropDownModule,
    NzMenuModule,
    AsyncPipe,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardLayoutComponent {
  store = inject(Store)
  title: string;
  collapsed = false;
  user$ = this.store.select(selectUser)

  constructor(private router: Router) {
    this.router.url.split("/")
    const splittedRoute = this.router.url.split("/").filter((path) => path !== "")
    this.title = splittedRoute[splittedRoute.length - 1] || splittedRoute[splittedRoute.length - 2] || ""
  }

  handleLogout(): void {
    this.store.dispatch(AuthActions.logout())
  }

  collapsedChange() {
    this.collapsed = !this.collapsed
  }
}
