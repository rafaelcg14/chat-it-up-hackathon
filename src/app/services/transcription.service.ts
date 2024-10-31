import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionService {

  private apiUrl = '';

  constructor( private http: HttpClient ) { }

  transcribeVideo( videoUrl: string ): Observable< {transcriptionUrl: string} > {
    return this.http.post< {transcriptionUrl: string} >( this.apiUrl, { url: videoUrl } );
  }

}
