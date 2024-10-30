import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadAzureService {

  private readonly backendUrl = 'http://localhost:8000/files/upload-files';

  constructor( private http: HttpClient ) {}

  // Upload a single file to the backend
  async uploadFile( file: File ): Promise<void> {
    const formData = new FormData();
    formData.append( 'files', file, file.name );

    try {
      await lastValueFrom(
        this.http.post<void>( this.backendUrl, formData ).pipe(
          catchError( this.handleError ),
          map( () => {
            console.log(`File ${file.name} uploaded successfully.`);
          } )
        )
      );
    } catch ( error ) {
      console.error( `Error uploading file ${file.name}`, error );
    }
  }

  // Error handler for debugging
  private handleError( error: HttpErrorResponse ): never {
    let errorMsg = 'An unknown error occurred!';
    if ( error.error instanceof ErrorEvent ) {
      errorMsg = `Error: ${ error.error.message }`;
    } else {
      errorMsg = `Server returned code: ${ error.status }, error message is: ${ error.message }`
    }

    console.error(errorMsg);
    throw new Error(errorMsg);
  }

}
