import { CommonModule} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TicketService } from '../../../core/services/ticket';
import { Ticket } from '../../../shared/models/ticket.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule,RouterModule,MatCardModule,MatButtonModule,MatIconModule,MatDividerModule],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss',
})
export class TicketDetail implements OnInit {
private route = inject(ActivatedRoute);
private ticketService = inject(TicketService);

ticket : Ticket | null = null;
errorMessage: string = '';
isLoading: boolean = true;

ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam) {
    const id = Number(idParam);
    this.fetchTicketDetails(id);
  } else {
    this.errorMessage = 'Invalid ticket ID.';
    this.isLoading = false;
  }
}

fetchTicketDetails(id: number): void {
  this.ticketService.getTicketById(id).subscribe({
    next: (response) => { 
      if (response.isSuccess) {
        this.ticket = response.data;
      } else {
        this.errorMessage = 'Failed to load ticket details.';
      }
      this.isLoading = false;
    },
    error: (error) => {
      this.errorMessage = 'An error occurred while fetching ticket details.';
      console.error('Error fetching ticket details:', error);
      this.isLoading = false;
    },
  });
}

}
