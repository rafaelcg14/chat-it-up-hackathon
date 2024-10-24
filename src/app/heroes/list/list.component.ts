import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  public huntersNames: string[] = [ 'Gon', 'Killua', 'Kurapika', 'Leorio' ]
  public removedHunter?: string;

  removeLastHunter(): void {
    this.removedHunter = this.huntersNames.pop();
  }

}
