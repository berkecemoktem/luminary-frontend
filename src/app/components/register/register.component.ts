import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  username: string ="";
  email: string ="";
  password: string ="";
  message: string = ""; 
  messageType: string = ""; 

  schoolName: string = '';
  grade: string = '';
  goal: string = '';

  fullName: string = '';
  age: number | null = null;
  birthDate: string = '';
  city: string = '';

  currentStep: number = 0;

  constructor(private router: Router, private http: HttpClient, private stepperService: StepperService) {}

  ngOnInit() {
    this.stepperService.currentStep$.subscribe(step => {
      this.currentStep = step;
    });
  }

  onRegister()
  {
    let bodyData = {
      username: this.username,
      email: this.email,
      password: this.password,
      schoolName: this.schoolName,
      grade: this.grade,
      fullName: this.fullName,
      age: this.age,
      birthDate: this.birthDate,
      city:this.city,
      goal:this.goal
    };

    this.http.post("http://localhost:8084/api/users/register",bodyData,{responseType: 'json'}).subscribe((resultData: any)=>{
      const userId = resultData.user?.id;

      this.message = "User Registered Successfully!";
      this.messageType = "success";

      localStorage.setItem('userId', JSON.stringify(userId));
      this.router.navigateByUrl('/dashboard');
    }, (error) => {
      console.error('Registration failed:', error);

      this.message = "Invalid email or password";
      this.messageType = "error";
    });
  }

  goToNextStep() {
    this.stepperService.goToNextStep();
  }

  goToPreviousStep() {
    this.stepperService.goToPreviousStep();
  }

}