import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductInterface } from '../../products/product-interface';
import { ProductsService } from '../../products/products.service';
import { CategoryInterface } from '../../categories/category-interface';
import { CategoriesService } from '../../categories/categories.service';

@Component({
  standalone: true,
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Input() itemSelected?: CategoryInterface | ProductInterface | any;
  @Input() itemIndex?: number;

  activeUrl?: string;

  constructor(
    private _productService: ProductsService,
    private _categoriesService: CategoriesService,
    private _router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._router.url.subscribe((value) => {
      this.activeUrl = value[0].path;
      console.log(this.itemSelected.id);
    });
  }

  onDeleteProduct() {
    switch (this.activeUrl) {
      case 'products':
        this._productService.deleteProductById(
          this.itemIndex!,
          this.itemSelected!.id
        );
        break;
      case 'categories':
        this._categoriesService.deleteCategoryById(
          this.itemIndex!,
          this.itemSelected!.id
        );
        break;
    }

    this.onCloseModal();
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
