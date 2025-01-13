import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core'; // Import HostListener
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { AnalyzeComponent } from '../analyze/analyze.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-practice-lab',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './practice-lab.component.html',
  styleUrl: './practice-lab.component.css',
  animations: [
    trigger('questionAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class PracticeLabComponent implements OnInit {
  questions: any[] = [];
  selectedAnswers: (string | null)[] = [];
  isResultsChecked = false;
  correctAnswersCount = 0;
  currentQuestionIndex = 0;
  mode: string = 'quiz'; // 'quiz' or 'result'
  scorePercentage: number = 0;
  scorePoints: number = 0;
  showReviewPopup = false;
  hintVisible: boolean[] = []; // Manage hint visibility for each question
  @ViewChild('popupContainer') popupContainer!: ElementRef;

  constructor(private questionService: QuestionService, private http: HttpClient,private storageService: StorageService,
              private userService: UserService, private router: Router) {}


  ngOnInit(): void {
    this.questionService.questions$.subscribe((questions) => {
      this.questions = questions;
      this.selectedAnswers = new Array(this.questions.length).fill(null);
      this.hintVisible = new Array(this.questions.length).fill(false); // Initialize hints
    });
  }

  submitAnswers(): void {
    this.isResultsChecked = true;
    this.correctAnswersCount = this.selectedAnswers.filter(
      (answer, index) =>
        answer !== null && answer === this.questions[index].answer
    ).length;

    this.scorePercentage = (this.correctAnswersCount / this.questions.length) * 100;
    this.mode = 'result';
  }

  finishReview(): void {
    this.showReviewPopup = true;

    if (this.scorePercentage >= 75) {
      this.scorePoints = (this.correctAnswersCount / this.questions.length) * 10;
    } else {
      this.scorePoints = 0;
    }

    // Send the scorePoints to the backend
    this.sendScoreToBackend(this.scorePoints);
  }

  sendScoreToBackend(score: number): void {

    const userId = this.storageService.getItem('userId');

    const url = `http://localhost:8084/api/student-summary/sendscore/${userId}`;

    // Data to send
    const scoreData = { score: score };

    // Make the POST request to the backend API
    this.http.post<string>(url, scoreData).subscribe(
      (response) => {
        console.log('Score sent successfully:', response);
      },
      (error) => {
        console.error('Error sending score:', error);
      }
    );
  }

  closeReviewPopup(): void {
    this.showReviewPopup = false;
  }

  assignAITask(): void {
    alert('AI task has been assigned!');
  }

  assignTask(): void {
    this.router.navigate(['task']);
  }

  regenerateQuestions(): void {
    alert('Questions have been regenerated!');
  }

  getOptions(question: any): string[] {
    return Object.keys(question.options);
  }

  getOptionLabel(index: number): string {
    const optionLabels = ['A', 'B', 'C', 'D', 'E'];
    return optionLabels[index];
  }

  isAnswerCorrect(index: number): boolean {
    return this.selectedAnswers[index] === this.questions[index].answer;
  }

  selectAnswer(index: number, option: string): void {
    this.selectedAnswers[index] = option;
  }

  clearAnswer(index: number): void {
    this.selectedAnswers[index] = null;
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  get progressPercentage(): number {
    const answeredQuestions = this.selectedAnswers.filter(
      (answer) => answer !== null
    ).length;
    return (answeredQuestions / this.questions.length) * 100;
  }

  isAnswered(index: number): boolean {
    return this.selectedAnswers[index] !== null;
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  getQuestionStatus(index: number): string {
    return this.isAnswered(index) ? 'answered' : 'not-answered';
  }

  toggleHint(index: number): void {
    this.hintVisible[index] = !this.hintVisible[index];
  }

  get score(): number {
    return this.scorePercentage; // Alias for scorePercentage
  }
}