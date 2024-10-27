import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterModule, NzLayoutModule, NzTypographyModule, NzBreadCrumbModule, NzAvatarComponent, NzMenuModule, NzDropDownModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardLayoutComponent {
  title: string;

  constructor(private router: Router) {
    this.router.url.split("/")
    const splittedRoute = this.router.url.split("/").filter((path) => path !== "")
    this.title = splittedRoute[splittedRoute.length - 1] || splittedRoute[splittedRoute.length - 2] || ""
  }
}
