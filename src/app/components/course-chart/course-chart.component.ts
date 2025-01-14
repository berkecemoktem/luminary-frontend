import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID} from '@angular/core';
import { ChartService } from '../../services/chart.service';
import { PieChartData } from '../../models/pie-chart-data.model';
import { StorageService } from '../../services/storage.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-course-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-chart.component.html',
  styleUrls: ['./course-chart.component.css'],
  providers: [ChartService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CourseChartComponent  {
  chartData: PieChartData[] = [];


  constructor(
    private chartService: ChartService,
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = this.storageService.getItem('userId');
      if (userId) {
        console.log("User ID found in storage.");
        this.fetchChartData();
      } else {
        console.error("User ID not found in storage.");
      }
    }
  }

  private fetchChartData(): void {
    const userId = this.storageService.getItem('userId');

    this.chartService.getCourseDistribution(userId).subscribe({
      next: (data) => {
        this.chartData = data;
        console.log(this.chartData);
      },
      error: (error) => {
        console.error('Error fetching chart data:', error);
      }
    });
  }

  getColor(course: string): string {
    switch (course) {
    case 'Biyoloji': return '#7FB069';
    case 'Fen Bilimleri': return '#FECDC4';
    case 'Fizik': return '#2AB7CA';
    case 'Matematik': return '#FF9F1C';
    case 'Kimya': return '#FE4A49';
    case 'Türkçe': return '#FF6B6B';
    case 'Tarih': return '#4ECDC4';
    case 'Coğrafya': return '#45B7D1';
    case 'Felsefe': return '#96CEB4';
    case 'Din Kültürü ve Ahlak Bilgisi': return '#FFEEAD';
    default: return '#9da7c2';
    }
  }

  generateSlicePath(slice: PieChartData, index: number): string {
    const startAngle = this.getStartAngle(index);
    const endAngle = startAngle + (slice.percentage / 100) * 2 * Math.PI;

    const radius = 50; // Increased radius for better proportions
    const startX = radius * Math.cos(startAngle);
    const startY = radius * Math.sin(startAngle);
    const endX = radius * Math.cos(endAngle);
    const endY = radius * Math.sin(endAngle);

    const largeArcFlag = slice.percentage > 50 ? 1 : 0;

    return `M 0 0
            L ${startX} ${startY}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
            Z`;
  }

  private getStartAngle(index: number): number {
    let startAngle = -Math.PI / 2; // Start from top
    for (let i = 0; i < index; i++) {
      startAngle += (this.chartData[i].percentage / 100) * 2 * Math.PI;
    }
    return startAngle;
  }

  getLabelTransform(slice: PieChartData, index: number): string {
    const startAngle = this.getStartAngle(index);
    const sliceAngle = (slice.percentage / 100) * 2 * Math.PI;
    const midAngle = startAngle + (sliceAngle / 2);

    // Calculate optimal radius based on slice percentage
    let labelRadius = 30; // Default radius for label placement

    // Adjust radius for very small slices
    if (slice.percentage < 10) {
      labelRadius = 40; // Place labels further out for small slices
    }

    const x = labelRadius * Math.cos(midAngle);
    const y = labelRadius * Math.sin(midAngle);

    // Calculate rotation angle for the text
    let rotationAngle = (midAngle * 180 / Math.PI);

    // Adjust text rotation to always be readable
    if (rotationAngle > 90 && rotationAngle < 270) {
      rotationAngle += 180;
    }

    return `translate(${x},${y}) rotate(${rotationAngle})`;
  }

  getLabelX(slice: PieChartData, index: number): number {
    const startAngle = this.getStartAngle(index);
    const sliceAngle = (slice.percentage / 100) * 2 * Math.PI;
    const angle = startAngle + (sliceAngle / 2);
    const radius = 25; // Slightly smaller than pie radius for inner labels
    return radius * Math.cos(angle);
  }

  getLabelY(slice: PieChartData, index: number): number {
    const startAngle = this.getStartAngle(index);
    const sliceAngle = (slice.percentage / 100) * 2 * Math.PI;
    const angle = startAngle + (sliceAngle / 2);
    const radius = 25; // Slightly smaller than pie radius for inner labels
    return radius * Math.sin(angle);
  }

  getLabelRotation(slice: PieChartData, index: number): string {
    const startAngle = this.getStartAngle(index);
    const sliceAngle = (slice.percentage / 100) * 2 * Math.PI;
    const angle = startAngle + (sliceAngle / 2);
    const degrees = (angle * 180 / Math.PI) + 90;
    if (degrees > 90 && degrees < 270) {
      return `rotate(${degrees + 180})`;
    }
    return `rotate(${degrees})`;
  }

}
