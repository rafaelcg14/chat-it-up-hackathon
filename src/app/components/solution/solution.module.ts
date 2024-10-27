import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { UrlFormComponent } from './url-form/url-form.component';
import { SolutionComponent } from './solution.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FileUploaderComponent,
    UrlFormComponent,
    SolutionComponent
  ],
  declarations: [
    FileUploaderComponent,
    UrlFormComponent,
    SolutionComponent
  ],
})
export class SolutionModule { }
