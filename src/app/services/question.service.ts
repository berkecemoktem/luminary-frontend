import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsSource = new BehaviorSubject<any[]>([]);
  questions$ = this.questionsSource.asObservable();

  constructor() {}

  setQuestions(questions: any[]): void {
    this.questionsSource.next(questions);
  }
  updateQuestions(questions: any[]): void {
    this.questionsSource.next(questions);
  }
}
