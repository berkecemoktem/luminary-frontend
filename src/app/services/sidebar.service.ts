import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private toggleSidebarSource = new Subject<void>();
  toggleSidebar$ = this.toggleSidebarSource.asObservable();

  toggleSidebar() {
    this.toggleSidebarSource.next();
  }
}
