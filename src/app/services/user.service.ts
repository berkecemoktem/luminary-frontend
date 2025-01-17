import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`http://localhost:8084/api/student-summary/${userId}`);
  }

  getAnalyzes(userId: number): Observable<any> {
    return this.http.get(`http://localhost:8080/hybrid/analysis/${userId}`);
  }

  getWeakness(userId: number): Observable<any> {
    return this.http.post<any>('http://localhost:8080/hybrid/weakness?userId=' + userId, {});
  }

}

