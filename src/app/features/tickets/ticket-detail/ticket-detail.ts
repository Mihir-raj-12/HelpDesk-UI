import { CommonModule} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TicketService } from '../../../core/services/ticket';
import { Ticket } from '../../../shared/models/ticket.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import {MatSelectModule } from '@angular/material/select';
import { Comment } from '../../../shared/models/comment.model'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,MatCardModule,MatButtonModule,MatIconModule,MatDividerModule,MatSelectModule,MatInputModule,MatFormFieldModule],
  templateUrl: './ticket-detail.html',
  styleUrl: './ticket-detail.scss',
})
export class TicketDetail implements OnInit {
private route = inject(ActivatedRoute);
private ticketService = inject(TicketService);

ticket : Ticket | null = null;
errorMessage: string = '';
isLoading: boolean = true;
isEditing: boolean = false;
supportAgents: any[] = [];
  editStatus: string = '';
  editPriority: string = '';
  editAgentId: string = '';
  comments: Comment[] = [];
  newCommentText: string = '';
  isSubmittingComment: boolean = false;

  statuses = ['Open', 'InProgress', 'Resolved', 'Closed'];
  priorities = ['Low', 'Medium', 'High', 'Critical'];

ngOnInit(): void {
  const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam) {
    const id = Number(idParam);
    this.fetchTicketDetails(id);
    this.ticketService.getSupportAgents().subscribe(res => {
        if (res.isSuccess) {
          this.supportAgents = res.data;
        }
      });
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
        this.fetchComments(id);
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
fetchComments(ticketId: number): void {
  this.ticketService.getComments(ticketId).subscribe(res => {
    if (res.isSuccess) {
      this.comments = res.data;
    }
  });
}

toggleEditMode(): void {
    if (!this.ticket) return;
    
    // When turning edit mode ON, copy the current values into our temporary variables
    this.editStatus = this.ticket.status;
    this.editPriority = this.ticket.priority;
    this.editAgentId = this.ticket.assignedToUserId || '';
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (!this.ticket) return;
    this.isLoading = true;

    // 1. Did the user actually change the agent dropdown?
    const currentAgentId = this.ticket.assignedToUserId || '';
    const agentChanged = this.editAgentId !== currentAgentId;

    // If the agent changed, we MUST assign it first before touching status!
    if (agentChanged && this.editAgentId !== '') {
      this.ticketService.assignTicket(this.ticket.id, this.editAgentId).subscribe({
        next: () => {
          // Assignment successful! Now do status and priority.
          this.updateStatusAndPriority();
        },
        error: () => this.finalizeSaveWithError()
      });
    } else {
      // Agent didn't change, jump straight to status and priority
      this.updateStatusAndPriority();
    }
  }

  private updateStatusAndPriority(): void {
    // Only update status if it actually changed
    if (this.editStatus !== this.ticket!.status) {
      this.ticketService.updateTicketStatus(this.ticket!.id, this.editStatus).subscribe({
        next: () => this.updatePriority(),
        error: () => this.finalizeSaveWithError()
      });
    } else {
      this.updatePriority();
    }
  }

  // Helper method to do the final update
  private updatePriority(): void {
    // Only update priority if it actually changed
    if (this.editPriority !== this.ticket!.priority) {
      this.ticketService.updateTicketPriority(this.ticket!.id, this.editPriority).subscribe({
        next: () => this.finalizeSave(),
        error: () => this.finalizeSaveWithError()
      });
    } else {
      this.finalizeSave();
    }
  }

  private finalizeSave(): void {
    this.isEditing = false;
    this.fetchTicketDetails(this.ticket!.id); // Refresh the page with new DB data
  }

  private finalizeSaveWithError(): void {
    this.errorMessage = "Failed to save some changes. Check your permissions.";
    this.isEditing = false;
    this.isLoading = false;
    this.fetchTicketDetails(this.ticket!.id); 
  }

  postComment(): void {
    // Prevent sending empty spaces
    if (!this.newCommentText.trim() || !this.ticket) return;

    this.isSubmittingComment = true;
    
    const payload = {
      ticketId: this.ticket.id,
      content: this.newCommentText
    };

    this.ticketService.addComment(payload).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          // Push the new comment into our list so the UI updates instantly
          this.comments.push(res.data);
          // Clear the text box so they can type another message
          this.newCommentText = ''; 
        }
        this.isSubmittingComment = false;
      },
      error: (err) => {
        console.error("Failed to post comment", err);
        this.isSubmittingComment = false;
      }
    });
  }
}
