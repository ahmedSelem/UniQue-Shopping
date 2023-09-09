import { Route } from '@angular/router';

import { AppAdmin } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';


export const ADMIN_ROUTES: Route[] = [
  {
    path: '',
    component: AppAdmin,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ExamScheduleComponent, title: 'Products' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
    ],
  },
];
