import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../shared/modal-service/toast.service';

import { ProductInterface } from './product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsLitsChanged = new BehaviorSubject<ProductInterface[] | null>(null);
  private products: ProductInterface[] = [];

  constructor(
    private _httpClient: HttpClient,
    private _toastrService: ToastService
  ) {}

  fetchProducts(): Observable<ProductInterface[]> {
    return this._httpClient
      .get<ProductInterface[]>('https://api.escuelajs.co/api/v1/products')
      .pipe(
        tap((response) => {
          this.products = response.reverse();
          this.productsLitsChanged.next(this.products.slice());
        }),
      );
  }

  updateProductById(
    productIndex: number,
    productId: number,
    productTitle: string,
    productPrice: number,
    productDesc: string
  ) {
    this._httpClient
      .put<ProductInterface>(
        'https://api.escuelajs.co/api/v1/products/' + productId,
        {
          title: productTitle,
          price: productPrice,
          description: productDesc,
        }
      )
      .subscribe({
        next: (response) => {
          this.products[productIndex] = response;
          this.productsLitsChanged.next(this.products.slice());
          this._toastrService.successShow('Update Successfully !');
        },
        error: (error) => {
          console.log(error);
          this._toastrService.errorShow('Error Has Occurred !');
        },
      });
  }

  deleteProductById(productIndex: number, productId: number) {
    this._httpClient
      .delete('https://api.escuelajs.co/api/v1/products/' + productId)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.products.splice(productIndex, 1);
          this.productsLitsChanged.next(this.products.slice());
          this._toastrService.successShow('Delete Successfully !');
        },
        error: (error) => {
          console.log(error);
          this._toastrService.errorShow('Error Has Occurred !');
        },
      });
  }

  createNewProduct(formData: {
    title: string;
    price: number;
    description: string;
    categoryId: number;
    images: string;
  }) {
    this._httpClient
      .post<ProductInterface>('https://api.escuelajs.co/api/v1/products/', {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        categoryId: formData.categoryId,
        images: [formData.images],
      })
      .subscribe({
        next: (response) => {
          this.products.reverse().push(response);
          this.productsLitsChanged.next(this.products.reverse());
          this._toastrService.successShow('Added Successfully !');
        },
        error: (error) => {
          console.log(error);
          this._toastrService.errorShow('Error Has Occurred !');
        },
      });
  }
}
