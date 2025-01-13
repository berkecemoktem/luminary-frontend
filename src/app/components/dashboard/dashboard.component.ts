import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { AnalyzeComponent } from '../analyze/analyze.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WeatherComponent } from '../weather/weather.component';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,FooterComponent,WeatherComponent,CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  user: any = {};
  userId: number = 0;


  constructor(private http: HttpClient, private router: Router,
      private storageService: StorageService,
      private userService: UserService, @Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2
   ) {}

     ngOnInit(): void {
           if (isPlatformBrowser(this.platformId)) {
             const userId = this.storageService.getItem('userId');
         
             if (userId) {
               this.fetchUserProfile(userId);
             } else {
               console.error("User ID not found in storage.");
             }
           } 
   
     }

     fetchUserProfile(userId: number) {
      this.userService.getUserProfile(userId).subscribe(
        (data) => {
          this.user = data;
          console.log('User data fetched:', this.user);
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }

    selectedItem: number = 1;  // Provide a default value
  
    // Method to handle the change event
    onSelectionChange(value: number) {
      this.selectedItem = value;
      this.toggleBodyClass();
    }
  
    // Method to toggle the body class
    toggleBodyClass() {
      const body = document.body;
      if (body.classList.contains('blue')) {
        this.renderer.removeClass(body, 'blue');
      } else {
        this.renderer.addClass(body, 'blue');
      }
    }


}
