import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandsInterface } from './brands-interface';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root', // (any , platform)
})
export class BrandsService {
  brandChanged = new Subject<BrandsInterface[]>();

  private brandsList: BrandsInterface[] = [];

  constructor(private _httpClient: HttpClient) {}

  fetchBrands() {
    return this._httpClient
      .get<BrandsInterface[]>(
        'https://64e7771bb0fd9648b78ffdb8.mockapi.io/api/v1/brand'
      )
      .pipe(
        tap((response) => {
          this.brandsList = response;
          this.brandChanged.next(this.brandsList.slice());
        })
      );
  }
}
