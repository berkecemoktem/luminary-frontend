import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = {};
  selectedTab: string = 'profile';
  userId: number = 0;

  existingPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private http: HttpClient, private router: Router,
    private storageService: StorageService,
    private userService: UserService, @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = this.storageService.getItem('userId');
  
      if (userId) {
        this.fetchUserProfile(userId);
      } else {
        console.error("User ID not found in storage.");
      }
    } 
  }

  switchTab(tabName: string) {
    this.selectedTab = tabName;
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

  changePassword() {
    if(this.newPassword === this.confirmPassword){
      this.http.put(`http://localhost:8084/api/users/${this.userId}/password`, this.newPassword).subscribe(
        (response: any) => {
          console.log('Password updated successfully:', response);
        },
        (error) => {
          console.error('Error updating password:', error);
          alert('Failed to update password. Please try again.');
        }
      );
    }else{
      alert('Passwords does not match');
    }
  }

}