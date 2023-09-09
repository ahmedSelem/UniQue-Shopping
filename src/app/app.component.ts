import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'unique-shopping';

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.currentUser.subscribe((data) => {
      console.log(data);
    });
    this._authService.autoLogin();
  }
}
