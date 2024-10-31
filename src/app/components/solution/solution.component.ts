import { Component } from '@angular/core';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent {

  selectedFeature: 'url' | 'dragDrop' | null = null;

  selectFeature( feature: 'url' | 'dragDrop' ): void {
    this.selectedFeature = feature;
  }

}
