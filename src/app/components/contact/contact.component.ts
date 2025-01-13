import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';

export interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HomeComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isLoading = false;
  submitted = false;
  message = '';
  messageType = '';

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  get f() {
    return this.contactForm.controls;
  }

  private initForm(): void {
    this.contactForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.messageType = '';

    this.contactService.sendEmail(this.contactForm.value).subscribe({
      next: () => {
        this.message = 'E-posta, iletişim bilgilerini almak için gönderildi.';
        this.messageType = 'alert-success';
        this.contactForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        this.message = error.status === 0 
          ? 'İletişim bilgileri alınırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' 
          : 'İsteğinizi işlerken bir hata oluştu. Lütfen tekrar deneyin.';
        this.messageType = 'alert-error';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}