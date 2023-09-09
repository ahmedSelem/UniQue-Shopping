import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleCLass () {
    this.isOpen = !this.isOpen;
  }

}
