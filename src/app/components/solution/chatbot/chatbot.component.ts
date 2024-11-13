import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import { ChatbotService } from '../../../services/chatbot.service';
import { UploadStatusService } from '../../../services/upload.status.service';

import { ChatMessage } from '../../../interfaces/chatbot.interface';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent implements OnInit, AfterViewChecked {

  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef;

  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;
  isUploadInProgress: boolean = false;
  isInitialDisabled: boolean = true;

  constructor(
    private chatbotService: ChatbotService,
    private uploadStatusService: UploadStatusService
  ) { }

  ngOnInit(): void {
    // Initial message from the chatbot
    this.messages.push(
      {
        text: "Hello, I'm Chat It Up! How can I help you today?",
        user: false
      }
    );

    setTimeout(() => {
      this.isInitialDisabled = false;
    }, 2000);

    this.uploadStatusService.uploadStatus$.subscribe( isUploading => {
      this.isUploadInProgress = isUploading;
    } );
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage(): void {
    if ( !this.userInput.trim() || this.isUploadInProgress || this.isInitialDisabled ) return;

    // Add user message to chat
    this.messages.push( { text: this.userInput, user: true } );

    // Store the message to pass to the service
    const userMessage = this.userInput;
    this.userInput = '' ;
    this.isLoading = true;

    // Send message to the chatbot service
    this.chatbotService.sendMessage( userMessage ).subscribe(
      resp => {
        const chatResponse = resp.response.chat_response
        const referenceTitles = resp.response.reference_titles

        this.messages.push( { text: chatResponse, user: false, references: referenceTitles } );
        this.isLoading = false;
      },
      err => {
        this.messages.push( { text: "Sorry, I'm having trouble responding. Please, try again later.", user: false } );
        this.isLoading = false;
      }
    );

    this.userInput = '';

  }

  autoGrow( event:any ): void {
    const textArea = event.target;

    textArea.style.height = 'auto';
    textArea.style.height = `${ textArea.scrollHeight }px`;
  }


}
