import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PracticeLabComponent } from '../practice-lab/practice-lab.component';
import { QuestionService } from '../../services/question.service'
import { StorageService } from '../../services/storage.service';
import { QuestionAnalyzeComponent } from '../question-analyze/question-analyze.component';

interface AnalyzeResult {
  course: string;
  topic: string;
  detailedExplanation: string;
  desiredNumberOfQuestions: number;
  desiredDifficultyLevel: string;
}

@Component({
  selector: 'app-analyze',
  standalone: true,
  imports: [NavbarComponent, DashboardComponent, CommonModule, QuestionAnalyzeComponent, RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule, PracticeLabComponent],
  templateUrl: './analyze.component.html',
  styleUrl: './analyze.component.css'
})

export class AnalyzeComponent implements OnInit {
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  numberOfQuestions: number = 1;
  difficultyLevel: string = 'medium';
  errorMessage: string = '';
  analyzeResult: AnalyzeResult | null = null;

  difficultyLevels = [
    { value: 'easy', label: 'Kolay' },
    { value: 'medium', label: 'Orta' },
    { value: 'hard', label: 'Zor' }
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private questionService: QuestionService
  ) {}

  ngOnInit() {}

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.isValidImageFile(file)) {
        this.handleFile(file);
      } else {
        this.errorMessage = 'Lütfen geçerli bir resim dosyası yükleyin (JPEG, PNG, GIF)';
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (this.isValidImageFile(file)) {
        this.handleFile(file);
      } else {
        this.errorMessage = 'Lütfen geçerli bir resim dosyası yükleyin (JPEG, PNG, GIF)';
      }
    }
  }

  private isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
  }

  private handleFile(file: File) {
    this.selectedFile = file;
    this.createPreview(file);
    this.errorMessage = '';
  }

  private createPreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async onSubmit() {
    if (!this.selectedFile) {
      this.errorMessage = 'Lütfen bir soru görseli seçin';
      return;
    }
    this.errorMessage = '';



    const userId = this.storageService.getItem('userId');
    if (!userId) {
      this.errorMessage = 'Kullanıcı kimliği bulunamadı';
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('image', this.selectedFile);
    formData.append('numberOfQuestions', this.numberOfQuestions.toString());
    formData.append('difficultyLevel', this.difficultyLevel);

    try {
      const response = await this.http.post<AnalyzeResult>(
        'http://localhost:8080/hybrid/analyze',
        formData
      ).toPromise();


      if(response != null){
        this.analyzeResult = response || null;
        this.router.navigateByUrl('/analyze');


      }
    } catch (error) {
      this.errorMessage = 'Soru analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.';
      console.error('Upload error:', error);
    }
  }

}
