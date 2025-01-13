import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';

export interface Photo {
  id: number;
  imageURL: string;
  course: string;
}

@Component({
  selector: 'app-my-history',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.css']
})
export class MyHistoryComponent implements OnInit {
  loading: boolean = false;
  error: string = '';
  photos: any[] = [];
  apiUrl: string = 'http://localhost:8080/api/upload/get-questions'; 
  
  constructor(
    private http: HttpClient,
    private storageService: StorageService,  // Assuming you have this service for accessing local storage
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loading = true;
    if (isPlatformBrowser(this.platformId)) {
      const userId = this.storageService.getItem('userId');  // Get the userId from local storage
      
      if (userId) {
        // Use the correct userId here for the API call
        this.http.get<any>(`${this.apiUrl}/${userId}`).subscribe({
          next: (photos) => {
            this.photos = photos;
            this.loading = false;
          },
          error: (error) => {
            this.error = 'Failed to load photos';
            this.loading = false;
            console.error('Error loading photos:', error);
          }
        });
      } else {
        console.error("User ID not found in storage.");
        this.loading = false;
        this.error = 'User ID not found';
      }
    } else {
      console.error('Not running in the browser platform.');
      this.loading = false;
      this.error = 'Platform is not browser';
    }
  }
}
