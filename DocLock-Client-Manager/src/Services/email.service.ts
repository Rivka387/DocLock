import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailRequest } from '../Models/EmailRequest';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:3000/api/Email'; // עדכני לפי הכתובת בפועל

  constructor(private http: HttpClient) { }

  sendEmail(request: EmailRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send`, request);
  }}
