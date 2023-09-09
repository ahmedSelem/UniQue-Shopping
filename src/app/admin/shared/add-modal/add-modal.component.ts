import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CategoriesService } from '../../categories/categories.service';
import { CategoryInterface } from '../../categories/category-interface';
import { ProductsService } from '../../products/products.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<void>();

  categoriesList: CategoryInterface[] | null = [];
  closeSubscription?: Subscription;
  addForm?: FormGroup;
  activeUrl?: string;

  constructor(
    private _categoriesService: CategoriesService,
    private _productService: ProductsService,
    private _router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.closeSubscription =
      this._categoriesService.categoriesChanged.subscribe((categories) => {
        this.categoriesList = categories;
      });

    this._router.url.subscribe((value) => {
      this.activeUrl = value[0].path;
    });

    this.addForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(this.categoriesList![0].id, [
        Validators.required,
      ]),
      images: new FormControl(
        'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg',
        [Validators.required]
      ),
    });

    if (this.activeUrl === 'categories') {
      this.addForm.removeControl('price');
      this.addForm.removeControl('description');
      this.addForm.removeControl('categoryId');
    }
  }

  onAddProduct(formDate: FormGroup) {
    switch (this.activeUrl) {
      case 'products':
        this._productService.createNewProduct(formDate.value);
        break;
      case 'categories':
        this._categoriesService.createNewCategory(
          formDate.value.title,
          formDate.value.images
        );
        break;
      default:
        break;
    }

    this.onCloseModal();
  }

  onCloseModal() {
    this.closeModal.next();
  }

  ngOnDestroy(): void {
    this.closeSubscription?.unsubscribe();
  }
}
