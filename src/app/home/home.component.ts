import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  constructor ( private _router : Router) {}

  onNavToAdminPanel() {
    this._router.navigate(['/admin']);
  }
}
