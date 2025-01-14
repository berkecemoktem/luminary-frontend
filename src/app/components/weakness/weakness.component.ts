import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnalyzeComponent } from '../analyze/analyze.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-weakness',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weakness.component.html',
  styleUrl: './weakness.component.css'
})
export class WeaknessComponent {
userId: number = 0;
  user: any = {};
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private questionService: QuestionService,
    private storageService: StorageService,
    private userService: UserService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = this.storageService.getItem('userId');
  
      if (userId) {
        this.fetchWeakness(userId);
      } else {
        console.error("User ID not found in storage.");
      }
    } 
  }

  fetchWeakness(userId: number) {
    this.userService.getWeakness(userId).subscribe(
      (data) => {
        this.user = data;
        console.log('User data fetched:', this.user);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  goToPracticeLab(){

    const userId = this.storageService.getItem('userId');

    this.http.post<any>('http://localhost:8080/hybrid/generate-questions?userId=' + userId, {})
    .subscribe(response => {
      this.questionService.setQuestions(response.questions);
      console.log("Questions are generated")
      console.log(response)
      this.router.navigate(['practice-lab']);
    }, error => {
      console.error('Error generating questions', error);
    });
} 
}
