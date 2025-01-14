import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PieChartData } from '../models/pie-chart-data.model'

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private baseUrl = 'http://localhost:8080/api/dashboard-chart';

  constructor(private http: HttpClient) { }

  getCourseDistribution(userId: number): Observable<PieChartData[]> {
    return this.http.get<PieChartData[]>(`${this.baseUrl}/course-distribution/${userId}`);
  }
}