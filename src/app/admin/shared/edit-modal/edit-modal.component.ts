import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductInterface } from '../../products/product-interface';
import { ProductsService } from './../../products/products.service';
import { CategoryInterface } from '../../categories/category-interface';
import { CategoriesService } from '../../categories/categories.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Input() itemSelected?: ProductInterface | CategoryInterface | any;
  @Input() itemIndex?: number;

  activeUrl?: string;
  editForm?: FormGroup;

  constructor(
    private _productsService: ProductsService,
    private _categoriesService: CategoriesService,
    private _router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._router.url.subscribe((value) => {
      console.log(value[0].path);
      this.activeUrl = value[0].path;
    });

    this.editForm = new FormGroup({
      title: new FormControl(
        this.activeUrl == 'products'
          ? this.itemSelected?.title
          : this.itemSelected?.name,
        [Validators.required]
      ),
      price: new FormControl(this.itemSelected?.price, [Validators.required]),
      image: new FormControl(this.itemSelected?.image, [Validators.required]),
      description: new FormControl(this.itemSelected?.description, [
        Validators.required,
      ]),
    });

    switch (this.activeUrl) {
      case 'products':
        this.editForm.removeControl('image');
        break;
      case 'categories':
        this.editForm.removeControl('price');
        this.editForm.removeControl('description');
        break;
    }
  }

  onUpdateItem(formGroup: FormGroup) {
    switch (this.activeUrl) {
      case 'products':
        this._productsService.updateProductById(
          this.itemIndex!,
          this.itemSelected!.id,
          formGroup.value.title,
          formGroup.value.price,
          formGroup.value.description
        );
        break;
      case 'categories':
        this._categoriesService.updateCategoryById(
          this.itemIndex!,
          this.itemSelected!.id,
          formGroup.value.title,
          formGroup.value.image
        );
        break;
    }

    this.onCloseModal();
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
