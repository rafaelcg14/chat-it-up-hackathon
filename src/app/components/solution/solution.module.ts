import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { UrlFormComponent } from './url-form/url-form.component';
import { SolutionComponent } from './solution.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
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
