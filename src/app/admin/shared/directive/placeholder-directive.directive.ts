import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appPlaceholderDirective]'
})
export class PlaceholderDirectiveDirective {

  constructor(public viewContaierRef : ViewContainerRef) { }

}
