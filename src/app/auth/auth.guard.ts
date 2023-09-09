import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  return _authService.currentUser.pipe(
    map((user) => {
      const isAuth = !user;
      if (isAuth) {
        return true;
      }
      return _router.createUrlTree(['./auth']);
    })
  );
};
