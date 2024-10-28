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
  array = ["images/carousel_1.jpg", "images/carousel_2.jpg", "images/carousel_3.jpg"];
}
