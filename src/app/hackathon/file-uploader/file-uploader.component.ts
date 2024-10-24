import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {

  isDragging = false;
  files: File[] = [];

  private dragDropSubject = new Subject<File[]>();

  constructor() {
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

}
