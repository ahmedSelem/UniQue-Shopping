import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BrandsInterface } from './brands-interface';
import { CommonModule } from '@angular/common';

import { BrandsService } from './brands.service';
import { PlaceholderDirectiveDirective } from '../shared/directive/placeholder-directive.directive';
import { LoadingComponent } from '../shared/loading/loading.component';
import { Subscription } from 'rxjs';
import { CreateModalService } from '../shared/modal-service/create-modal.service';

@Component({
  standalone: true,
  imports: [CommonModule, PlaceholderDirectiveDirective, LoadingComponent],
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class BrandsComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirectiveDirective, { static: true })
  modalHost?: PlaceholderDirectiveDirective;
  
  brandsList: BrandsInterface[] = [];
  isLoading: boolean = false;
  isError: boolean = false;
  brandSubscription? : Subscription;

  constructor (private _brandsService : BrandsService, private _createModalService : CreateModalService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.brandSubscription = this._brandsService.brandChanged.subscribe((brands) => {
      this.brandsList = brands;
    });

    this.brandSubscription = this._brandsService.fetchBrands().subscribe({
      next: (_) => {
        this.isLoading = false;
      },
      error: (_) => {
        this.isLoading = false;
        this.isError = true;
      }
    })
  }

  openModal(
      typeClick?: string,
      brandSelected?: BrandsInterface,
      categoryIndex?: number
    ) {
      this._createModalService.createNewCmpProgrammatically(
        this.modalHost!,
        typeClick,
        brandSelected,
        categoryIndex
      );
    }

  ngOnDestroy(): void {
    this.brandSubscription?.unsubscribe();
  }


}
