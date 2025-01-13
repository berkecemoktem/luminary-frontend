import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    LoginForm!: FormGroup;
    submitted = false;
  
    constructor(
      private router: Router,
      private http: HttpClient,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit() {
      this.LoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    get f() {
      return this.LoginForm.controls;
    }
  
    onLogin() {
      this.submitted = true;
    
    if (this.LoginForm.invalid) {
      return;
    }
      const bodyData = this.LoginForm.value;
      this.http.post("http://localhost:8084/api/users/login", bodyData).subscribe(
        (resultData: any) => {
          if (resultData?.message === "Email is not exists") {
            alert("Email does not exist");
          } else if (resultData?.message === "Login Success") {
            const userId = resultData.user?.id;
            if (userId) {
              localStorage.setItem('userId', JSON.stringify(userId));
              console.log("User ID saved:", userId);
              this.router.navigateByUrl('/dashboard');
            } else {
              console.error("User ID is missing in the response.");
            }
          } else {
            alert("Incorrect Email or Password.");
          }
        },
        (error) => {
          console.error('Login error:', error);
          alert(
            error.status === 0
              ? "Cannot reach the server. Please check your network."
              : "An error occurred during login. Please try again."
          );
        }
      );
    }
  }
