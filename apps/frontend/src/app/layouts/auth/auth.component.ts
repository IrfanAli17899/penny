import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, NzTypographyModule, NzCarouselModule],
  templateUrl: './auth.component.html',
})
export class AuthLayoutComponent {
  array = [1, 2, 3, 4];
}
