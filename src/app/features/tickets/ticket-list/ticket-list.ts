import { Component, inject, OnInit } from '@angular/core';
import { TicketService } from '../../../core/services/ticket';
import { AuthService } from '../../../core/services/auth'; // Injecting the Bouncer!
import { Ticket } from '../../../shared/models/ticket.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; // NEW!
import { MatFormFieldModule } from '@angular/material/form-field'; // NEW!
import { MatInputModule } from '@angular/material/input'; // NEW!

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.scss',
})
export class TicketList implements OnInit {
  private ticketService = inject(TicketService);
  private authService = inject(AuthService); // Check who is logged in

  // The special Material Data Source that handles search filtering!
  dataSource = new MatTableDataSource<Ticket>();
  
  // These must exactly match the "matColumnDef" names in the HTML
  displayedColumns: string[] = ['id', 'title', 'category', 'raisedBy', 'date', 'status', 'priority', 'actions'];

  errorMessage: string = '';
  isLoading: boolean = true;
  canCreateTicket: boolean = false;

  ngOnInit(): void {
    // 1. Check Role: Only Regular Users and Admins can create tickets
    const role = this.authService.getUserRole();
    this.canCreateTicket = (role === 'Admin' || role === 'RegularUser');

    // 2. Fetch the data
    this.ticketService.getTickets().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          // Feed the data into the special data source
          this.dataSource.data = response.data || [];
        } else {
          this.errorMessage = 'Failed to load tickets.';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while fetching tickets.';
        console.error('Error fetching tickets:', error);
        this.isLoading = false;
      },
    });
  }

  // 3. The Search Filter Logic
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // This magically searches through every column of data!
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}