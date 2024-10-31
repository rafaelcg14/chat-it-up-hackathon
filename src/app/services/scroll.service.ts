import { Injectable, ElementRef } from '@angular/core';

@Injectable(
  {providedIn: 'root'
})
export class ScrollService {

  private targetElement!: ElementRef;

  setTargetElement( elem: ElementRef ): void {
    this.targetElement = elem;
  }

  scrollToTarget(): void {
    if ( this.targetElement ) {
      this.targetElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
