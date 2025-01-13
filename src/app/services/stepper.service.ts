import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private currentStepSubject = new BehaviorSubject<number>(0);
  currentStep$ = this.currentStepSubject.asObservable();

  constructor() {}

  goToNextStep() {
    const currentStep = this.currentStepSubject.value;
    this.currentStepSubject.next(currentStep + 1);
  }

  goToPreviousStep() {
    const currentStep = this.currentStepSubject.value;
    this.currentStepSubject.next(currentStep - 1);
  }
}
