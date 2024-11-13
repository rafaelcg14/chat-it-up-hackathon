import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadStatusService {

  private uploadStatusSubject = new BehaviorSubject<boolean>( false ); // false = not uploading, true = uploading
  public uploadStatus$ = this.uploadStatusSubject.asObservable();

  setUploadStatus( isUploading: boolean ): void {
    this.uploadStatusSubject.next( isUploading );
  }

}
