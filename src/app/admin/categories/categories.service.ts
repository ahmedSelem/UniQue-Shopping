import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

import { CategoryInterface } from './category-interface';
import { ToastService } from '../shared/modal-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categoriesChanged = new Subject<CategoryInterface[]>();
  private categories: CategoryInterface[] = [];

  constructor(
    private _httpClient: HttpClient,
    private _toastrService: ToastService
  ) {}

  fetchCategories(): Observable<CategoryInterface[]> {
    return this._httpClient
      .get<CategoryInterface[]>('https://api.escuelajs.co/api/v1/categories')
      .pipe(
        tap((response) => {
          this.categories = response;
          this.categoriesChanged.next(this.categories!.slice());
        })
      );
  }

  updateCategoryById(
    categoryIndex: number,
    categoryId: number,
    categoryName: string,
    categoryImage: string
  ) {
    this._httpClient
      .put<CategoryInterface>(
        'https://api.escuelajs.co/api/v1/categories/' + categoryId,
        {
          name: categoryName,
          image: categoryImage,
        }
      )
      .subscribe({
        next: (response) => {
          this.categories[categoryIndex] = response;
          this.categoriesChanged.next(this.categories.slice());
          this._toastrService.successShow('Updated Successfully !');
        },
        error: (_) => {
          this._toastrService.errorShow('Error Has Occurred !');
        },
      });
  }

  deleteCategoryById(categoryIndex: number, categoryId: number) {
    this._httpClient
      .delete('https://api.escuelajs.co/api/v1/categories/' + categoryId)
      .subscribe({
        next: (_) => {
          this.categories.splice(categoryIndex, 1);
          this.categoriesChanged.next(this.categories.slice());
          this._toastrService.successShow('Deleted Successfully !');
        },
        error: (_) => {
          this._toastrService.errorShow('Error Has Occurred !');
        },
      });
  }

  createNewCategory(categoryName: string, categoryImage: string) {
    this._httpClient
      .post<CategoryInterface>('https://api.escuelajs.co/api/v1/categories/', {
        name: categoryName,
        image: categoryImage,
      })
      .subscribe({
        next: (response) => {
          this.categories.push(response);
          this.categoriesChanged.next(this.categories.slice());
          this._toastrService.successShow('Category Added Successfully !');
        },
        error: (_) => {
          this._toastrService.errorShow('Error Has Occurred !');
        },
      });
  }
}
