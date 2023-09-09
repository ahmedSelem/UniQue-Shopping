import { CreateModalService } from './../shared/modal-service/create-modal.service';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { CategoriesService } from './categories.service';
import { CategoryInterface } from './category-interface';
import { PlaceholderDirectiveDirective } from '../shared/directive/placeholder-directive.directive';
import { LoadingComponent } from '../shared/loading/loading.component';

@Component({
  standalone: true,
  imports: [CommonModule, PlaceholderDirectiveDirective, LoadingComponent],
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirectiveDirective, { static: true })
  modalHost?: PlaceholderDirectiveDirective;

  categoriesList: CategoryInterface[] = [];
  isError : boolean = false;
  isLoading : boolean = false;
  fetchSubscription? : Subscription;
  catChangedSubscription? : Subscription;


  constructor(
    private _categoriesService: CategoriesService,
    private _modalService: CreateModalService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchSubscription = this._categoriesService.fetchCategories().subscribe({
      next: (_) => {
        this.isLoading = false;
      },
      error: (_) => {
        this.isLoading = false;
        this.isError = true;
      }
    });
    this.catChangedSubscription = this._categoriesService.categoriesChanged.subscribe((categories) => {
      this.categoriesList = categories;
    });
  }

  openModal(
    typeClick?: string,
    CategorySelected?: CategoryInterface,
    categoryIndex?: number
  ) {
    this._modalService.createNewCmpProgrammatically(
      this.modalHost!,
      typeClick,
      CategorySelected,
      categoryIndex
    );
  }

  ngOnDestroy(): void {
    this.fetchSubscription?.unsubscribe();
    this.catChangedSubscription?.unsubscribe();
  }
}
