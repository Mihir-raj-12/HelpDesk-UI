import { Component, inject, OnInit } from '@angular/core';
import { DashboardStats } from '../../shared/models/dashboard.model';
import { CommonModule, DecimalPipe } from '@angular/common'; // Added DecimalPipe for formatting percentages
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar'; // NEW: For the visual bars!
import { DashboardService } from '../../core/services/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DecimalPipe, MatCardModule, MatIconModule, MatDividerModule, MatListModule, MatProgressBarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  stats: DashboardStats | null = null;
  errorMessage: string = '';

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (response) => {
        if (response.isSuccess) {
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

  // HELPER 1: Calculates the percentage for the progress bars
  getPercent(value: number, total: number): number {
    if (!total || total === 0) return 0;
    return (value / total) * 100;
  }

  // HELPER 2: Calculates how much ticket volume went up or down compared to last month
  getTrend(): { value: number, isUp: boolean } {
    if (!this.stats) return { value: 0, isUp: false };
    
    // Using the exact properties your C# DTO already provides!
    const current = this.stats.ticketsThisMonth;
    const previous = this.stats.ticketsLastMonth;

    if (previous === 0) return { value: current > 0 ? 100 : 0, isUp: current > 0 };

    const change = ((current - previous) / previous) * 100;
    return { value: Math.abs(change), isUp: change > 0 };
  }
}