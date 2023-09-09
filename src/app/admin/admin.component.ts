import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AsideComponent } from './aside/aside.component';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  imports: [RouterModule, AsideComponent, HeaderComponent],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AppAdmin{

}
