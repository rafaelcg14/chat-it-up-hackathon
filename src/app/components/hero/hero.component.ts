import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  public heroName: string = 'SlideGenius AI';
  public description: string = 'this is just a description for the hero name. Please, contact us if you want some help.';

}
