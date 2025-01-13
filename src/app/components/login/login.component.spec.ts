import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]), // Mock routing
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values and required validators', () => {
    const emailControl = component.LoginForm.get('email');
    const passwordControl = component.LoginForm.get('password');

    expect(emailControl?.value).toBe('');
    expect(passwordControl?.value).toBe('');
    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();
  });

  it('should validate email and password fields correctly', () => {
    const emailControl = component.LoginForm.get('email');
    const passwordControl = component.LoginForm.get('password');

    emailControl?.setValue('invalidEmail');
    passwordControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();

    emailControl?.setValue('test@example.com');
    passwordControl?.setValue('password123');
    expect(emailControl?.valid).toBeTruthy();
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should submit the form and navigate on successful login', () => {
    const emailControl = component.LoginForm.get('email');
    const passwordControl = component.LoginForm.get('password');

    emailControl?.setValue('test@example.com');
    passwordControl?.setValue('password123');

    spyOn(component['router'], 'navigateByUrl');

    component.onLogin();

    const req = httpMock.expectOne('http://localhost:8080/api/users/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'test@example.com',
      password: 'password123',
    });

    req.flush({
      message: 'Login Success',
      user: { id: 1 },
    });

    expect(localStorage.getItem('userId')).toBe(JSON.stringify(1));
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should alert when email does not exist', () => {
    spyOn(window, 'alert');

    component.LoginForm.setValue({
      email: 'nonexistent@example.com',
      password: 'password123',
    });

    component.onLogin();

    const req = httpMock.expectOne('http://localhost:8080/api/users/login');
    req.flush({
      message: 'Email is not exists',
    });

    expect(window.alert).toHaveBeenCalledWith('Email does not exist');
  });

  it('should alert when incorrect email or password is provided', () => {
    spyOn(window, 'alert');

    component.LoginForm.setValue({
      email: 'test@example.com',
      password: 'wrongpassword',
    });

    component.onLogin();

    const req = httpMock.expectOne('http://localhost:8080/api/users/login');
    req.flush({
      message: 'Incorrect Email or Password.',
    });

    expect(window.alert).toHaveBeenCalledWith('Incorrect Email or Password.');
  });

  it('should handle server errors gracefully', () => {
    spyOn(window, 'alert');

    component.LoginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onLogin();

    const req = httpMock.expectOne('http://localhost:8080/api/users/login');
    req.error(new ErrorEvent('Network error'), { status: 0 });

    expect(window.alert).toHaveBeenCalledWith(
      'Cannot reach the server. Please check your network.'
    );
  });
});
