import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ContactComponent } from '../contact/contact.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, LoginComponent, RegisterComponent, AboutComponent, ContactComponent, ForgotPasswordComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentSlideIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      const darkModeEnabled = localStorage.getItem('dark-mode') === 'true';
      if (darkModeEnabled) {
        document.querySelector('main')?.classList.add('dark-mode');
        document.querySelector('.form')?.classList.add('dark-mode');
        document.querySelector('.bulb')?.classList.add('dark-mode');
      }
    }
  }

  toggleDarkMode(): void {
    if (typeof window !== 'undefined') {
      const mainElement = document.querySelector('main');
      const formElement = document.querySelector('.form');
      const bulbElement = document.querySelector('.bulb');

      mainElement?.classList.toggle('dark-mode');
      formElement?.classList.toggle('dark-mode');
      bulbElement?.classList.toggle('dark-mode');

      const isDarkMode = mainElement?.classList.contains('dark-mode');
      localStorage.setItem('dark-mode', isDarkMode ? 'true' : 'false');
    }
  }

  navigateTo(index: number): void {
    this.currentSlideIndex = index;
    this.setActiveLink(index);
  }

  private setActiveLink(index: number): void {
    const links = document.querySelectorAll('.Links li');
    links.forEach(link => link.classList.remove('activeLink'));
    links[index]?.classList.add('activeLink');
  }
}