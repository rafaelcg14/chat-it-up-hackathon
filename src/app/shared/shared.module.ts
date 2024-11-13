import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    SafeUrlPipe,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SafeUrlPipe,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
