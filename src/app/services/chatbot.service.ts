import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  // Server url
  private apiUrl = 'http://localhost:8000/chat';

  constructor( private http:HttpClient ) {}

  sendMessage( message: string ): Observable<any> {
    const headers = new HttpHeaders( { 'Content-Type': 'application/json' } );

    return this.http.post<any>( this.apiUrl, { message }, { headers } );
  }

}
