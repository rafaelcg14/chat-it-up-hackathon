import { Component } from '@angular/core';

import { TranscriptionService } from '../../../services/transcription.service';

@Component({
  selector: 'url-form',
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.css'
})
export class UrlFormComponent {

  public videoUrl: string = '';
  public loading: boolean = false;
  public transcriptionAvailable: boolean = false;
  public transcriptionUrl: string = '';

  constructor ( private transcriptionService: TranscriptionService ) {}

  onSubmit(): void {
    if ( this.videoUrl ) {
      this.loading = true;
      this.transcriptionAvailable = false;

      this.transcriptionService.transcribeVideo( this.videoUrl ).subscribe({
        next: ( resp ) => {
          this.transcriptionUrl = resp.transcriptionUrl;
          this.transcriptionAvailable = true;
        },
        error: () => {
          alert('An error ocurred during transcription. Please try again.');
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  downloadTranscription(): void {
    if ( this.transcriptionUrl ) {
      const link = document.createElement('a');
      link.href = this.transcriptionUrl;
      link.download = 'transcription.txt';
      link.click();
    }
  }

}
