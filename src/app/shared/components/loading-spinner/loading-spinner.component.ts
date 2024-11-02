import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: `
    <div class="spinner">
      <div class="spinner-icon"></div>
      <span>{{ message }}</span>
    </div>
  `,
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {

  @Input()
  public message: string = 'Loading...';

}
