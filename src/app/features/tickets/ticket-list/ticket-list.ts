import { Component, inject, OnInit } from '@angular/core';
import { TicketService } from '../../../core/services/ticket';
import { Ticket } from '../../../shared/models/ticket.model';
import { CommonModule } from '@angular/common';
// Bring in the Material Tools!
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule,RouterModule ] ,
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.scss',
})
export class TicketList implements OnInit {
private ticketService = inject(TicketService);

tickets: Ticket[] = [];
errorMessage: string = '';
isLoading: boolean = true;

ngOnInit(): void {
  this.ticketService.getTickets().subscribe({
    next: (response) => {
      if (response.isSuccess) {
        this.tickets = response.data;
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
}
