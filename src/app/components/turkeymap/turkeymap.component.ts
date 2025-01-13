import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface CityData {
  cityName: string;
  courseName: string;
  percentage: number;
  predictedCourse: string;
}

@Component({
  selector: 'app-turkeymap',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './turkeymap.component.html',
  styleUrl: './turkeymap.component.css'
})

@Injectable()
export class TurkeymapComponent implements OnInit {
  selectedCity: CityData | null = null;
  allCityData: CityData[] = [];
  
  courseColors = new Map<string, string>([
    ['Türkçe', '#FF6B6B'],
    ['Tarih', '#4ECDC4'],
    ['Coğrafya', '#45B7D1'],
    ['Felsefe', '#96CEB4'],
    ['Din Kültürü ve Ahlak Bilgisi', '#FFEEAD'],
    ['Matematik', '#FF9F1C'],
    ['Fizik', '#2AB7CA'],
    ['Kimya', '#FE4A49'],
    ['Biyoloji', '#7FB069'],
    ['No Data', '#000000']
  ]);

  //constructor(private http: HttpClient) {}
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  ngOnInit() {
    // Initialize map and load initial data
    this.loadCityData();
  }

  loadCityData() {
    // Replace with your actual API endpoint
    this.http.get<CityData[]>('http://localhost:8083/api/turkey-map/city-information').subscribe(
      (data) => {
        console.log(data);
        
        // Update city colors based on the response
        this.allCityData = data;
        data.forEach(cityData => {
          // Find the element by data-iladi attribute
          const cityElement = this.document.querySelector(`[data-iladi="${cityData.cityName}"]`);
          
          if (cityElement) {

            // Find all <path> elements inside the <g> group
            const pathElements = cityElement.querySelectorAll('path');
            
            // Get the color for the courseName
            const color = this.courseColors.get(cityData.courseName) || '#ffffff';
            
            // Loop through each <path> and set the fill color
            Array.from(pathElements).forEach((pathElement: SVGPathElement) => {
              pathElement.setAttribute('style', `fill: ${color} !important`);
            });

          }
        });
      },
      (error) => {
        console.error('Error loading city data:', error);
      }
    );
  }

  onCityClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
  
    const parentElement = (event.target as HTMLElement).parentNode as Element;
  
    const cityName = parentElement?.getAttribute('data-iladi'); // Get the city identifier
  
    // Find the city data in allCityData based on the city name
    const cityData = this.allCityData.find(city => city.cityName === cityName);
  
    if (cityData) {
      this.selectedCity = cityData;
  
      const popup = document.getElementById('popup');
      if (popup) {
        popup.style.left = `${rect.left + window.scrollX}px`;
        popup.style.top = `${rect.bottom + window.scrollY}px`;
        popup.style.display = 'block';
      }
    } else {
      console.error('City data not found!');
    }
  }

  closePopup() {
    this.selectedCity = null;
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }




  //Hower functions
  
  showCityName(event: MouseEvent) {
    const info = document.querySelector('.il-isimleri div') as HTMLElement;
    if (info) {
      const parentElement = (event.target as HTMLElement).parentNode as Element;

      const cityName = parentElement?.getAttribute('data-iladi');

      info.textContent = cityName || "";
      info.style.left = event.pageX + 'px';
      info.style.top = event.pageY + 'px';
      info.style.display = 'block';
    }
  }

  moveCityName(event: MouseEvent){
    const info = document.querySelector('.il-isimleri div') as HTMLElement;
    if (info) {
      info.style.left = event.pageX + 'px';
      info.style.top = event.pageY + 'px';
    }
  }

  hideCityName() {
    const info = document.querySelector('.il-isimleri div') as HTMLElement;
    if (info) {
      info.style.display = 'none';
    }
  }
}
