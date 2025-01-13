import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  messageType: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onForgotPassword() { 
    const bodyData = {
      email: this.email,
    };

    this.http.post('http://localhost:8084/api/users/requestPasswordReset', bodyData, { responseType: 'text' }).subscribe(
      (resultData) => {
        if (resultData) {
          this.message = 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.';
          this.messageType = 'success';
        } 
        else {
          this.message = 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.';  
          this.messageType = 'success';
        }
      },
      (error) => {
        this.message = 'İsteğinizi işlerken bir hata oluştu. Lütfen tekrar deneyin.';
        this.messageType = 'error';
      }
    );
  }
}