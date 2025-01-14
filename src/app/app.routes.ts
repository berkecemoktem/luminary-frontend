import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnalyzeComponent } from './components/analyze/analyze.component';
import { PracticeLabComponent } from './components/practice-lab/practice-lab.component';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ChatComponent } from './components/chat/chat.component';
import { MyHistoryComponent } from './components/my-history/my-history.component';
import { EnvironmentComponent } from './components/environment/environment.component';
import { BooksComponent } from './components/books/books.component';
import { QuestionAnalyzeComponent } from './components/question-analyze/question-analyze.component';
import { TurkeymapComponent } from './components/turkeymap/turkeymap.component';
import {SmartstudyComponent} from "./components/smartstudy/smartstudy.component";
import {WeaknessComponent} from "./components/weakness/weakness.component";

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'upload',
        component: AnalyzeComponent
    },
    {
        path: 'analyze',
        component: QuestionAnalyzeComponent
    },
    {
        path: 'map',
        component: TurkeymapComponent
    },
    {
        path: 'practice-lab',
        component: PracticeLabComponent
    },
    {
        path: 'task',
        component: MyTaskComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'file-upload',
        component: FileUploadComponent
    },
    {
        path: 'history',
        component: MyHistoryComponent
    },
    {
        path: 'environments',
        component: EnvironmentComponent
    },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'lab-page/biology/9',
        component: ChatComponent
    },
    {
      path: 'smartstudy',
      component: SmartstudyComponent
    },
    {
      path: 'weakness',
      component: WeaknessComponent
    }
];
