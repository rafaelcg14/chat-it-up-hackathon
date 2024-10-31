import { Component } from '@angular/core';

import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  public heroName: string = 'Chat It Up!';

  constructor( private scrollService: ScrollService ) {}

  scrollToSection(): void {
    this.scrollService.scrollToTarget();
  }

}
