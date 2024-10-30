import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

  public heroName: string = 'Chat It Up!';
  public description: string = 'Transforma la experiencia de conversación: más que un simple chat, es una herramienta inteligente que extrae y organiza conocimiento de tus documentos, audios y videos, brindándote respuestas precisas y resúmenes accesibles en un instante. ';

}
