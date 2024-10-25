import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { FileUploadAzureService } from '../file-upload-azure.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {

  public isDragging = false;
  public files: File[] = [];
  public uploadMessage: string = '';
  private dragDropSubject = new Subject<File[]>();


  constructor( private fileUploadService: FileUploadAzureService ) {
    // Subscribe to the dnd subject
    this.dragDropSubject.subscribe( (newFiles: File[]) => {
      this.files.push( ...newFiles );
    } );

  }

  // Handle drag-over event
  onDragOver( event: DragEvent ) {
    event.preventDefault();
    this.isDragging = true;
  }

  // Handle drag-leave event
  onDragLeave( event: DragEvent ) {
    this.isDragging = false;
  }

  // Handle drop event
  onDrop( event: DragEvent ) {
    event.preventDefault();
    this.isDragging = false;

    const droppedFiles = Array.from( event.dataTransfer?.files || [] );
    this.addFiles( droppedFiles );
  }

  // Handle file selection via input
  onFileSelected( event: Event ) {
    const input = event.target as HTMLInputElement;
    const selectedFiles = Array.from( input.files || [] );
    this.addFiles( selectedFiles );
  }

  // Add files to the list and emit through Subject
  private addFiles( files: File[] ) {
    this.dragDropSubject.next( files );
  }

  // Upload all files when the button is clicked
  async uploadAllFiles() {
    if ( this.files.length === 0 ) {
      this.uploadMessage = 'No files selected for upload.';
      return;
    }

    this.uploadMessage = 'Uploading...';

    for ( const file of this.files ) {
      try {
        await this.fileUploadService.uploadFile( file );
        console.log(`File uploaded: ${ file.name }`);
      } catch (error) {
        console.log(`Error uploading file: ${ file.name }`, error);
      }
    }

    this.uploadMessage = 'Files uploaded successfully!';
  }


}
