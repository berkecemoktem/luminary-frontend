import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BooksComponent } from '../books/books.component';

@Component({
  selector: 'app-environment',
  standalone: true,
  imports: [CommonModule,BooksComponent],
  templateUrl: './environment.component.html',
  styleUrl: './environment.component.css'
})
export class EnvironmentComponent {
  selectedEnvironment: string | null = null;

  constructor(private router: Router) {}

  selectEnvironment(environment: string): void {
    this.selectedEnvironment = environment;
    
    // Add a small delay for the animation to complete
    setTimeout(() => {
      if (environment === 'smart-study') {
        this.router.navigate(['/file-upload']);
      } else if (environment === 'meb') {
        this.router.navigate(['/books']);
      }
    }, 300);
  }
}
