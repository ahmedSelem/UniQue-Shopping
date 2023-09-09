import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [LoadingComponent, ReactiveFormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  errorMsg? : string;
  isLoading: boolean = false;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userType: new FormControl('user', [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$'),
      ]),
    });
  }

  onLogin(formGroup: FormGroup) {
    this.isLoading = true;
    this._authService.login(formGroup.value).subscribe({
      next: (_) => {
        this.loginForm?.reset();
        this.isLoading = false;
      },
      error : (error) => {
        this.errorMsg = error.error.message;
        this.isLoading = false;
      }
    });
  }
}
