import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { FileUploadAzureService } from '../../../services/file-upload-azure.service';
import { UploadStatusService } from '../../../services/upload.status.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent implements OnInit {

  public isDragging = false;
  public files: File[] = [];
  public uploadMessage: string = '';
  public errorMessage: string = '';
  public isLoading: boolean = false;
  private dragDropSubject = new Subject<File[]>();
  private readonly ALLOWED_TYPES = ['text/plain', 'application/pdf', 'audio/mpeg', 'audio/wav', 'audio/x-m4a'];
  private readonly IS_DEV_MODE = false; // Set to 'false' in production

  constructor(
    private fileUploadService: FileUploadAzureService,
    private uploadStatusService: UploadStatusService
  ) {
    this.dragDropSubject.subscribe((newFiles: File[]) => {
      this.addFiles(newFiles);
    });
  }

  ngOnInit(): void { }

  // Handle drag-over event
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  // Handle drag-leave event
  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  // Handle drop event
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const droppedFiles = Array.from(event.dataTransfer?.files || []);
    this.dragDropSubject.next(droppedFiles);
  }

  // Handle file selection via input
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedFiles = Array.from(input.files || []);
    this.dragDropSubject.next(selectedFiles);
  }

  // Add files to the list
  private addFiles(files: File[]) {
    this.errorMessage = '';

    files.forEach(file => {
      if (!this.isAllowedFileType(file)) {
        this.errorMessage = `File ${file.name} is not a supported format.`;
        return;
      }
      this.files.push(file);
    });
  }

  // Check if the file type is allowed
  private isAllowedFileType(file: File): boolean {
    return this.ALLOWED_TYPES.includes(file.type);
  }

  // Remove a specific file from the list
  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  // Upload all files when the button is clicked
  async onUploadClick() {
    this.uploadStatusService.setUploadStatus(true);
    this.uploadMessage = '';
    this.errorMessage = '';

    if (this.files.length > 0 && this.IS_DEV_MODE) {
      this.isLoading = true;
      this.uploadMessage = 'Processing...';

      try {
        for (const file of this.files) {
          await this.fileUploadService.uploadFile(file);
          console.log(`File uploaded: ${file.name}`);
        }

        this.files = [];
        this.uploadMessage = 'Completed! Interact with the chatbot.';

      } catch (error) {
        console.error('Error uploading files:', error);
        this.uploadMessage = 'Error occurred during upload. Please, try again.';
      } finally {
        // Delay hiding the loading spinner and message after upload completes
        setTimeout(() => {
          this.isLoading = false;
          this.uploadStatusService.setUploadStatus(false);
        }, 120000);
      }
    } else {
      this.uploadMessage = 'No files to upload.';
    }
  }
}
