import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = 'http://localhost:5000/upload';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  uploadFile(formData: FormData, userId: number): Observable<number | boolean> {
  
    formData.append('userId', userId.toString())
    return this.http.post(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = event.total ? Math.round(100 * event.loaded / event.total) : 0;
            return progress;
          case HttpEventType.Response:
            this.router.navigateByUrl('/chat');
            return true;
          default:
            return 0;
        }
      })
    );
  }
}