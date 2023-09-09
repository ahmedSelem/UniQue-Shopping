
import { Injectable } from '@angular/core';

import { AddModalComponent } from '../add-modal/add-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { PlaceholderDirectiveDirective } from '../directive/placeholder-directive.directive';

@Injectable({
  providedIn: 'root'
})
export class CreateModalService {

  constructor() { }
  
  createNewCmpProgrammatically(
    modalHost: PlaceholderDirectiveDirective,
    typeClick?: string,
    itemSelected?: any,
    productIndex?: number
  ) {
    const hostViewContainerRef = modalHost.viewContaierRef;
    hostViewContainerRef?.clear();

    let createComonentRef;
    if (typeClick === 'add') {
      createComonentRef =
        hostViewContainerRef?.createComponent(AddModalComponent);
      createComonentRef!.instance.closeModal.subscribe(() => {
        hostViewContainerRef?.clear();
      });
      return;
    } else if (typeClick === 'edit') {
      createComonentRef =
        hostViewContainerRef?.createComponent(EditModalComponent);
    } else {
      createComonentRef =
        hostViewContainerRef?.createComponent(DeleteModalComponent);
    }

    // Share Data Between The Main Component and Modal Component (Binding Data)
    createComonentRef!.instance.itemSelected = itemSelected;
    createComonentRef!.instance.itemIndex = productIndex;
    createComonentRef!.instance.closeModal.subscribe(() => {
      hostViewContainerRef?.clear();
    });
  }


}
