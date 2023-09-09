import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonModule } from '@angular/common';

import { ProductsService } from './products.service';
import { ProductInterface } from './product-interface';
import { PlaceholderDirectiveDirective } from '../shared/directive/placeholder-directive.directive';
import { CreateModalService } from '../shared/modal-service/create-modal.service';
import { CategoriesService } from '../categories/categories.service';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  standalone: true,
  imports: [CommonModule, PlaceholderDirectiveDirective, LoadingComponent],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirectiveDirective, { static: true })
               modalHost?: PlaceholderDirectiveDirective;

  productList?: ProductInterface[];
  isError : boolean = false;
  isLoading : boolean = false;
  productsSubscription? : Subscription;
  categoriesSubscription? : Subscription;
  skeletonLoading = new Array(10);

  constructor(
    private _productService: ProductsService,
    private _createModalService: CreateModalService,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productsSubscription = this._productService.fetchProducts().subscribe({
      next: (listProduct) => {
        this.productList = listProduct!;
        this.isLoading = false;
      },
      error: (_) => {
        this.isLoading = false;
        this.isError = true;
      }
    });

    this.categoriesSubscription = this._categoriesService.fetchCategories().subscribe({
      error: (_) => {
        this.isError = true;
      }
    });

    this._productService.productsLitsChanged.subscribe((listProduct) => {
      this.productList = listProduct!;
    });
   
  }

  openModal(
    typeClick?: string,
    product?: ProductInterface,
    productIndex?: number
  ) {
    this._createModalService.createNewCmpProgrammatically(
      this.modalHost!,
      typeClick,
      product,
      productIndex
    );
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
  }
}
