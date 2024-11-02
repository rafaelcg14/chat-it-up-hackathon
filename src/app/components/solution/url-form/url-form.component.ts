import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { TranscriptionService } from '../../../services/transcription.service';

@Component({
  selector: 'url-form',
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.css'
})
export class UrlFormComponent {

  public videoUrlControl = new FormControl('');
  public loading: boolean = false;
  public transcriptionAvailable: boolean = false;
  public transcriptionUrl: string = '';
  public validVideoUrl: string | null = null;

  constructor ( private transcriptionService: TranscriptionService ) {
    this.videoUrlControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe( ( url ) => {
      this.validVideoUrl = this.isValidYouTubeUrl(url!) ? url : null;
    } );
  }

  onSubmit(): void {
    if ( this.videoUrlControl.value ) {
      this.loading = true;
      this.transcriptionAvailable = false;

      this.transcriptionService.transcribeVideo( this.videoUrlControl.value ).subscribe({
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

  private isValidYouTubeUrl( url: string ): boolean {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    return pattern.test( url );
  }

}
