import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard';
import { DashboardStats } from '../../shared/models/dashboard.model';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,JsonPipe , MatCardModule, MatIconModule, MatDividerModule, MatListModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit{
  private dashboardService = inject(DashboardService);

stats : DashboardStats | null = null;
errorMessage: string = '';

ngOnInit(): void {
  this.dashboardService.getStats().subscribe({
    next: (response) => {
      if(response.isSuccess) {
        this.stats = response.data;
      } else {
       
        this.errorMessage = response.message;
      }
      },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Unable to load dashboard stats. Please try again later.';
    }
  });
}

}
