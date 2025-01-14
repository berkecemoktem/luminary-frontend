import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

interface ChatMessage {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit {
  userQuery = '';
  messages: ChatMessage[] = [];
  inputHeight: string = '40px';
  isLoading = false;
  images = [
    '14.jpg',
    '15.jpg',
    '16.jpg',
    '17.jpg',
    '18.jpg',
    '19.jpg',
    '20.jpg',
    '21.jpg',
    '22.jpg',
    '23.jpg',
    '24.jpg',
    '25.jpg',
    '26.jpg',
    '27.jpg',
    '28.jpg',
    '29.jpg',
    '30.jpg',
    '31.jpg',
    '32.jpg',
    '33.jpg',
    '34.jpg',
    '35.jpg',
    '36.jpg',
    '37.jpg',
    '38.jpg',
    '39.jpg',
    '40.jpg',
    '41.jpg',
    '42.jpg',
    '43.jpg',
    '44.jpg',
    '45.jpg',
    '46.jpg',
    '47.jpg',
    '48.jpg',
    '49.jpg',
    '50.jpg',
    '51.jpg',
    '52.jpg',
    '53.jpg',
    '54.jpg',
    '55.jpg',
    '56.jpg',
    '57.jpg',
    '58.jpg',
    '59.jpg',
    '60.jpg',
    '61.jpg',
    '62.jpg',
    '63.jpg',
    '64.jpg',
    '65.jpg',
    '66.jpg',
    '67.jpg',
    '68.jpg',
    '69.jpg',
    '70.jpg',
    '71.jpg',
    '72.jpg',
    '73.jpg',
    '74.jpg',
    '75.jpg',
    '76.jpg',
    '77.jpg',
    '78.jpg',
    '79.jpg'

  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.messages.push({
      text: 'Merhaba! Nasıl yardımcı olabilirim?',
      isUser: false
    });
  }

  autoResize(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    // Set the height to "auto" to reset it, and then adjust it based on scrollHeight
    textarea.style.height = 'auto';
    this.inputHeight = `${textarea.scrollHeight}px`; // Adjust height based on content
  }

  sendMessage(): void {
    if (this.userQuery.trim()) {
      // Add user message
      this.messages.push({
        text: this.userQuery,
        isUser: true
      });

      // Add loading message
      this.messages.push({
        text: '',
        isUser: false,
        isLoading: true
      });

      this.scrollToBottom();

      // Send user query to backend
      this.http.post<{ response: string }>('http://localhost:8088/api/chat', { userQuery: this.userQuery })
        .subscribe(
          (response) => {
            // Remove loading message and add response
            this.messages = this.messages.filter(msg => !msg.isLoading);
            this.messages.push({
              text: response.response,
              isUser: false
            });
            this.userQuery = '';
            this.scrollToBottom();
          },
          (error) => {
            // Remove loading message and add error message
            this.messages = this.messages.filter(msg => !msg.isLoading);
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
