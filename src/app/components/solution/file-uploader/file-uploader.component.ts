import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { FileUploadAzureService } from '../../../services/file-upload-azure.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {

  public isDragging = false;
  public files: File[] = [];
  public uploadMessage: string = '';
  public errorMessage: string = '';
  private dragDropSubject = new Subject<File[]>();
  private readonly MAX_FILES = 5;
  private readonly ALLOWED_TYPES = [ 'text/plain', 'application/pdf', 'audio/mpeg', 'audio/wav', 'audio/x-m4a' ];
  private readonly COOLDOWN_HOURS = 6;
  private readonly IS_DEV_MODE = true; // Set to 'false' in production

  constructor( private fileUploadService: FileUploadAzureService ) {
    this.dragDropSubject.subscribe( (newFiles: File[]) => {
      if ( this.canUpload() ) {
        this.addFiles( newFiles );
      }
    } );

  }

  ngOnInit(): void {
    if ( !this.IS_DEV_MODE && !this.canUpload() ) {
      const hoursLeft = this.hoursLeftToUpload();
      this.uploadMessage = `Please wait ${ hoursLeft } more hours to upload new files`;
    }
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
    this.dragDropSubject.next( droppedFiles );
  }

  // Handle file selection via input
  onFileSelected( event: Event ) {
    const input = event.target as HTMLInputElement;
    const selectedFiles = Array.from( input.files || [] );
    this.dragDropSubject.next( selectedFiles );
  }

  // Add files to the list if the meet conditions
  private addFiles( files: File[] ) {
    this.errorMessage = '';

    files.forEach( file => {
      if ( this.files.length < this.MAX_FILES ) {
        if ( this.isAllowedFileType ( file ) ) {
          this.files.push( file );
        } else {
          this.errorMessage = `File ${ file.name } is not a supported format.`;
        }
      }
    } );
  }

  // Check if the file type is allowed
  private isAllowedFileType ( file: File ): boolean {
    return this.ALLOWED_TYPES.includes( file.type );
  }

  // Remove a specific file from the list
  removeFile( index: number ) {
    this.files.splice( index, 1 );
  }

  // Upload all files when the button is clicked
  async onUploadClick() {
    if ( this.files.length > 0 && ( this.IS_DEV_MODE || this.canUpload() ) ) {
      for ( const file of this.files ) {
        try {
          await this.fileUploadService.uploadFile( file );
          console.log(`File uploaded: ${ file.name }`);
        } catch (error) {
          console.log(`Error uploading file: ${ file.name }`, error);
        }
      }
      this.files = []; // Clear the list of files
      if ( !this.IS_DEV_MODE ) {
        this.setLastUploadTime(); // Set last upload timestamp in localStorage
      }
    } else {
      this.uploadMessage = 'You have reached the maximum file limit or need to wait to upload again.';
    }
  }

  // Check if user is within the cooldown period
  canUpload(): boolean {
    if (this.IS_DEV_MODE) return true;

    const lastUploadTime = parseInt( localStorage.getItem('lastUploadTime') || '0', 10 );
    const timeElapsed = Date.now() - lastUploadTime;

    return timeElapsed >= this.COOLDOWN_HOURS * 60 * 60 * 1000;
  }

  // Set the last upload time in localStorage
  private setLastUploadTime() {
    localStorage.setItem( 'lastUploadTime', Date.now().toString() );
  }

  // Calculate hours left for cooldown
  private hoursLeftToUpload(): number {
    const lastUploadTime = parseInt( localStorage.getItem( 'lastUploadTime' ) || '0', 10 );
    const timeElapsed = Date.now() - lastUploadTime;
    const hoursLeft = this.COOLDOWN_HOURS - Math.floor( timeElapsed / (60 * 60 * 1000) );

    return hoursLeft;
  }


}
