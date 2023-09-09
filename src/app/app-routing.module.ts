import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './auth/auth.guard';
import { UploadFileComponent } from './upload-file/upload-file.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full', title: 'Authentication' },
  { path: 'auth', component: AuthComponent, title: 'Authentication' },
  {
    path: 'home',
    canActivate: [authGuard],
    component: UploadFileComponent,
    title: 'Home',
  },
  // Standalone Component Lazy Loading
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((c) => c.AboutComponent),
  },
  // Module Lazy Loading
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./admin/routes').then((m) => m.ADMIN_ROUTES),
  },
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];

