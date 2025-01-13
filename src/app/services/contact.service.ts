import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8084/api/users/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(formData: ContactFormData): Observable<any> {
    return this.http.post(this.apiUrl, formData, { responseType: 'text' });
  }
}
