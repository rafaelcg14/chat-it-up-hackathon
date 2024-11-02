import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { UrlFormComponent } from './url-form/url-form.component';
import { SolutionComponent } from './solution.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

import { ChatbotService } from '../../services/chatbot.service';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FileUploaderComponent,
    UrlFormComponent,
    SolutionComponent,
    ChatbotComponent
  ],
  declarations: [
    FileUploaderComponent,
    UrlFormComponent,
    SolutionComponent,
    ChatbotComponent
  ],
  providers: [
    ChatbotService
  ]
})
export class SolutionModule { }
