import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule,DOCUMENT, isPlatformBrowser} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';

interface Task {
  taskNo: number;
  task: string;
  taskStatus: 'TODO' | 'doing' | 'done';
  isEditing?: boolean;
}

@Component({
  selector: 'app-my-task',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, HttpClientModule],
  templateUrl: './my-task.component.html',
  styleUrl: './my-task.component.css'
})
export class MyTaskComponent implements OnInit{
  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];
  newTask: string = '';
  apiUrl = 'http://localhost:8081/api/myTask';
  userId:Number=0;

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient, private storageService: StorageService,@Inject(PLATFORM_ID) private platformId: Object) {
    // const localStorage = document.defaultView?.localStorage;
    // if(localStorage){
    //   const storedUserId = this.storageService.getItem('userId');
    //   if (storedUserId) {
    //      this.userId=Number(storedUserId);
    //      console.log(this.userId);

    //   } else {
    //     console.warn('User ID not found in localStorage');
    //     this.userId= 0;
    //   }
    // }

  }

  ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
          const userId = this.storageService.getItem('userId');

          if (userId) {
            this.loadTasks();
          } else {
            console.error("User ID not found in storage.");
          }
        }

  }

  loadTasks() {
    const userId = this.storageService.getItem('userId');
    this.http.get<Task[]>(`${this.apiUrl}/${userId}`).subscribe(
      (tasks) => {
        this.todoTasks = tasks.filter(task => task.taskStatus === 'TODO');
        this.doingTasks = tasks.filter(task => task.taskStatus === 'doing');
        this.doneTasks = tasks.filter(task => task.taskStatus === 'done');
      },
      (error) => console.error('Error loading tasks:', error)
    );
  }

  addTask() {
    const userId = this.storageService.getItem('userId');
    console.log('Adding task with userId:', userId); // Add this line
    if (this.newTask.trim()) {
      this.http.post<Task>(`${this.apiUrl}/addTask`, {
        userId: userId,
        task: this.newTask,
        taskStatus: 'TODO'
      }).subscribe(
        (response) => {
          this.todoTasks.push(response);
          this.newTask = '';
        },
        (error) => console.error('Error adding task:', error)
      );
    }
  }

  deleteTask(taskList: Task[], task: Task) {
    const userId = this.storageService.getItem('userId');
    this.http.delete(`${this.apiUrl}/deleteTask`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      body:{
        userId: userId,
        taskNo: task.taskNo
      }

    }).subscribe(
      () => {
        const index = taskList.indexOf(task);
        if (index > -1) {
          taskList.splice(index, 1);
        }
      },
      (error) => console.error('Error deleting task:', error)
    );
  }

  editTask(task: Task) {
    task.isEditing = true;
  }

  saveTask(taskList: Task[], task: Task) {
    console.log('saveTask called with:', task); // Add this to see if method is called
    console.log('isEditing value:', task.isEditing); // Add this to check the flag

    if (task.isEditing) {
      task.isEditing = false;
      const userId = Number(localStorage.getItem('userId'));

      const updatePayload = {
        userId: userId,
        taskNo: task.taskNo,
        taskStatus: task.taskStatus
      };

      console.log('Sending update:', updatePayload);

      this.http.put(`${this.apiUrl}/updateTask`, updatePayload).subscribe(
        () => console.log('Task updated successfully'),
        (error) => console.error('Error updating task:', error)
      );
    }
  }


  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // Update task place in backend
      const task = event.container.data[event.currentIndex];
      const userId = Number(this.storageService.getItem('userId')); // Fix: use storageService
      const newPlace = this.getTaskPlace(event.container.id);

      this.http.put(`${this.apiUrl}/updateTask`, {
        userId: userId,
        taskNo: task.taskNo,
        taskStatus: newPlace
      }).subscribe(
        () => console.log('Task status updated successfully'),
        (error) => console.error('Error updating task place:', error)
      );
    }
  }

  private getTaskPlace(containerId: string): 'TODO' | 'doing' | 'done' {
    switch (containerId) {
      case 'todo-list': return 'TODO';  // Changed from 'todo' to 'TODO'
      case 'doing-list': return 'doing';
      case 'done-list': return 'done';
      default: return 'TODO';  // Changed default 'todo'
    }
  }


}
