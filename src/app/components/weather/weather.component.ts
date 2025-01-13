import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  weather: any = {}; // Holds raw weather data
  city: string = 'Ankara'; // Default city
  temperature: number = 0; // Temperature in Celsius
  description: string = ''; // Weather description
  iconUrl: string = ''; // Weather icon URL
  errorMessage: string = '';
  user: any = {};
  userId: number = 0;

  // Description translation map
  weatherDescriptionMap: { [key: string]: string } = {
    'clear sky': 'Açık hava',
    'few clouds': 'Az bulutlu',
    'scattered clouds': 'Parçalı bulutlu',
    'broken clouds': 'Kırık bulutlar',
    'shower rain': 'Sağanak yağış',
    'rain': 'Yağmur',
    'thunderstorm': 'Gök gürültülü fırtına',
    'snow': 'Kar',
    'mist': 'Sis',
    'light rain': 'Hafif yağmur',
    'overcast clouds': 'Kapalı hava'
  };

  constructor(private weatherService: WeatherService, private http: HttpClient, private router: Router,
      private storageService: StorageService,
      private userService: UserService, @Inject(PLATFORM_ID) private platformId: Object
   ) {}

  ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
          const userId = this.storageService.getItem('userId');
      
          if (userId) {
            this.getWeather(userId);
          } else {
            console.error("User ID not found in storage.");
          }
        } 

  }

  getWeather(userId:number): void {
    this.userService.getUserProfile(userId).subscribe(
      (data) => {
        this.city = data.city;
        this.weatherService.getWeather(data.city).subscribe({
          next: (data) => {
    
            this.weather = data;
            this.temperature = this.weather.main.temp;
    
            // Translate description to Turkish
            const englishDescription = this.weather.weather[0].description;
            this.description = this.weatherDescriptionMap[englishDescription] || englishDescription;
    
            // Set icon URL
            this.iconUrl = `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`;
    
            this.errorMessage = ''; // Clear error messages
          },
          error: (error) => {
            if (error.status === 401) {
              this.errorMessage = 'Geçersiz API anahtarı. Lütfen kontrol edin ve tekrar deneyin.';
            } else {
              this.errorMessage = 'Hava durumu bilgisi alınırken bir hata oluştu.';
            }
            console.error('API Error:', error);
          }
        });
        console.log('User data fetched:', this.city);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}