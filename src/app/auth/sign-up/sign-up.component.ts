import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { identityRevealedValidator } from './identity-confirm-password.directive';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingComponent],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @Output() signUpSuccess = new EventEmitter<void>();
  signUpForm?: FormGroup;
  errorMsg? : string;
  isLoading: boolean = false;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      // userType: new FormControl('user', [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).*$'),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).*$'),
      ]),
    }, {validators: identityRevealedValidator });
  }

  onSignUp(formGroup: FormGroup) {
    this.isLoading = true;
    this._authService.singUp(formGroup.value).subscribe({
      next: (_) => {
        this.signUpSuccess.next();
        this.isLoading = false;
        this.signUpForm?.reset();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMsg = error.error.error;
        console.log(error.error.error);
        
      },
    });
  }

  
}
