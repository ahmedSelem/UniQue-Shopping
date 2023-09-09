import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { authInterface } from './auth-interface';
import { User } from './auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);
  private setTimeLogOut: any;
  private APIKEy: string = 'AIzaSyD4RNSZNDQXs5Yp4y6Wgj07vdx3MxcdKlY';

  constructor(private _httpClient: HttpClient, private _router: Router) {}

  singUp(formGroup: { email: string; password: string }): Observable<any> {
    return this._httpClient.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        this.APIKEy,
      {
        email: formGroup.email,
        password: formGroup.password,
        returnSecureToken: true,
      }
    );
  }

  login(formGroup: {
    email: string;
    password: string;
  }): Observable<authInterface> {
    return this._httpClient
      .post<authInterface>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.APIKEy,
        {
          email: formGroup.email,
          password: formGroup.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((response) => {
          this._handelSaveUserData(response);
        })
      );
  }

  autoLogin() {
    const getCurrentUser: any = localStorage.getItem('currentUser');
    const userData: any = JSON.parse(getCurrentUser);
    if (!getCurrentUser) {
      return;
    }
    const currentUser = new User(
      userData.id,
      userData.email,
      new Date(userData._expirationDate),
      userData._token
    );
    if (currentUser.token) {
      this.currentUser.next(currentUser);
      const expiryMilliseconds: number =
        new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expiryMilliseconds);
    }
  }

  logOut() {
    this.currentUser.next(null);
    localStorage.removeItem('currentUser');
    this._router.navigate(['./auth']);
    if (this.setTimeLogOut) {
      clearTimeout(this.setTimeLogOut);
    }
    this.setTimeLogOut = null;
  }

  autoLogout(timeExpire: number) {
    this.setTimeLogOut = setTimeout(() => {
      this.logOut();
    }, timeExpire);
  }

  private _handelSaveUserData(currentUser: authInterface) {
    this._router.navigate(['/home']);
    const expirationDate = new Date(currentUser.expiresIn);
    const user = new User(
      currentUser.localId,
      currentUser.email,
      expirationDate,
      currentUser.idToken
    );
    this.currentUser.next(user);

    const currentUserStr = JSON.stringify(user);
    localStorage.setItem('currentUser', currentUserStr);

    const expiryMilliseconds: number =
      expirationDate.getTime() - new Date().getTime();

    this.autoLogout(expiryMilliseconds);
  }
}
