import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharepdfService {
  private pdfFile = new BehaviorSubject<File | null>(null);
  private pdfDataUrl = new BehaviorSubject<string | null>(null);
  
  currentPdfFile = this.pdfFile.asObservable();
  currentPdfDataUrl = this.pdfDataUrl.asObservable();

  setPdfFile(file: File) {
    this.pdfFile.next(file);
    // Convert File to data URL
    const reader = new FileReader();
    reader.onload = () => {
      this.pdfDataUrl.next(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}
