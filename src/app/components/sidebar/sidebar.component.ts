import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isExpanded = false;
  private subscription!: Subscription;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.subscription = this.sidebarService.toggleSidebar$.subscribe(() => {
      this.toggleSidebar();
    });
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
