import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { routes } from './app.routes'; 
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common"; 

import { AppComponent } from './app.component';
import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { AboutComponent } from "./components/about/about.component";
import { AnalyzeComponent } from "./components/analyze/analyze.component";
import { ContactComponent } from "./components/contact/contact.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { PracticeLabComponent } from "./components/practice-lab/practice-lab.component";
import { MyTaskComponent } from "./components/my-task/my-task.component";
import { StorageService } from "./services/storage.service";
import { UserService } from "./services/user.service";
import { StepperService } from "./services/stepper.service";
import { QuestionService } from "./services/question.service";
import { WeatherComponent } from "./components/weather/weather.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { ChatComponent } from "./components/chat/chat.component";
import { FileUploadService } from "./services/file-upload.service";
import { MyHistoryComponent } from "./components/my-history/my-history.component";
import { EnvironmentComponent } from "./components/environment/environment.component";
import { BooksComponent } from "./components/books/books.component";
import { MapComponent } from "./components/map/map.component";
import { QuestionAnalyzeComponent } from "./components/question-analyze/question-analyze.component";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AnalyzeComponent,
    ContactComponent,
    DashboardComponent,
    FooterComponent,
    ForgotPasswordComponent,
    HomeComponent,
    LoginComponent,
    MyTaskComponent,
    NavbarComponent,
    RegisterComponent,
    SidebarComponent,
    PracticeLabComponent,
    WeatherComponent,
    FileUploadComponent,
    ChatComponent,
    MyHistoryComponent,
    EnvironmentComponent,
    BooksComponent,
    MapComponent,
    QuestionAnalyzeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [StorageService, UserService, StepperService, QuestionService, FileUploadService],
  bootstrap: [AppComponent],
})
export class AppModule {}