import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { register } from 'swiper/element/bundle';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { SharepdfService } from '../../services/sharepdf.service';

// Register Swiper custom elements
register();

@Component({
  selector: 'app-smartstudy',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './smartstudy.component.html',
  styleUrl: './smartstudy.component.css'
})
export class SmartstudyComponent implements OnInit, OnDestroy {
  userQuery = '';
  messages: Array<{ text: string; isUser: boolean }> = [];
  inputHeight: string = '40px';
  pdfDataUrl: string | null = null;
  safePdfUrl: SafeResourceUrl | null = null;
  private pdfSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private pdfService: SharepdfService,
    private sanitizer: DomSanitizer
  ) {
    this.pdfSubscription = this.pdfService.currentPdfDataUrl.subscribe(url => {
      this.pdfDataUrl = url;
      if (url) {
        this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
    });
  }

  ngOnInit() {
    this.messages.push({
      text: 'Merhaba! Nasıl yardımcı olabilirim?',
      isUser: false
    });
  }

  ngOnDestroy() {
    if (this.pdfSubscription) {
      this.pdfSubscription.unsubscribe();
    }
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    this.inputHeight = `${textarea.scrollHeight}px`;
  }

  sendMessage(): void {
    if (this.userQuery.trim()) {
      this.messages.push({
        text: this.userQuery,
        isUser: true
      });

      this.http.post<{ answer: string }>('http://localhost:8089/ask', { question: this.userQuery })
        .subscribe(
          (response) => {
            this.messages.push({
              text: response.answer,
              isUser: false
            });
            this.userQuery = '';
            this.scrollToBottom();
          },
          (error) => {
            console.error('Error:', error);
            this.messages.push({
              text: 'Üzgünüm, bir şeyler ters gitti.',
              isUser: false
            });
            this.userQuery = '';
          }
        );
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const chatBox = document.getElementById('chat-box');
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    });
  }
}
