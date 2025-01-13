import { Component } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonEngine } from '@angular/ssr';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
  errorMessage?: string; // Optional error message property
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  uploads: FileUpload[] = [];
  isDragging = false;

  constructor(
    private fileUploadService: FileUploadService, private storageService: StorageService, 
    private router: Router
  ) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  private handleFiles(files: FileList): void {
    // Ensure only the first file is uploaded
    if (files.length > 1) {
      alert('Yalnızca bir dosya yüklemeye izin verilir.');
      return;
    }

    const file = files[0];
    
    // If file is not a PDF, show error
    if (file.type !== 'application/pdf') {
      this.uploads = [{
        file,
        progress: 0,
        status: 'error',
        errorMessage: 'Yalnızca PDF dosyaları izin verilir.'
      }];
      return;
    }

    // Proceed with the upload if file is valid
    const upload: FileUpload = {
      file,
      progress: 0,
      status: 'pending'
    };

    // Reset uploads array to ensure only one file is being uploaded at a time
    this.uploads = [upload];
    this.uploadFile(upload);
  }

  private uploadFile(upload: FileUpload): void {
    const formData = new FormData();
    formData.append('file', upload.file);

    if (!upload?.file) {
      upload.status = 'error';
      upload.errorMessage = 'Yüklenmek üzere dosya sağlanmadı.';
      return;
    }

    upload.status = 'uploading';
    const userId = this.storageService.getItem('userId');

    this.fileUploadService.uploadFile(formData, userId).subscribe({
      next: (progress: number | boolean) => {
        if (typeof progress === 'number') {
          upload.progress = progress;
        } else if (progress === true) {
          upload.status = 'done';
        }
      },
      error: (error) => {
        upload.status = 'error';
        upload.errorMessage = 'Yükleme başarısız oldu, lütfen tekrar deneyin.';
      }
    });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
