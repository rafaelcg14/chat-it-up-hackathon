import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  public name: string = 'gon';
  public age: number = 12;

  get capitalizedName(): string {
    return this.name.toUpperCase();
  }

  getHeroDescription(): string {
    return `${ this.name } - ${ this.age }`;
  }

  changeHero(): void {
    this.name = 'Leorio';
  }

  changeAge(): void {
    this.age = 16;
  }

  resetForm(): void {
    this.name = 'gon';
    this.age = 12;
  }

}
