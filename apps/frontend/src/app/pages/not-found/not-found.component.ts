import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink, NzResultModule, NzButtonModule],
  templateUrl: './not-found.component.html',
})
export class NotFoundPageComponent {

}