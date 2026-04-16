import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators , FormGroup, ReactiveFormsModule,} from '@angular/forms';
import { TicketService } from '../../../core/services/ticket';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ticket-create.html',
  styleUrl: './ticket-create.scss',
})
export class TicketCreate {
private fb = inject(FormBuilder);
private ticketService = inject(TicketService);
private router = inject(Router);

categories = [
    { id: 1, name: 'Hardware Issue' },
    { id: 2, name: 'Software Bug' },
    { id: 3, name: 'Access Request' },
    { id: 4, name: 'Network Problem' }
  ];

  priorities = ['Low', 'Medium', 'High', 'Critical'];

  ticketForm = this.fb.group({
    title : ['' , [Validators.required, Validators.maxLength(100)]],
    description : ['' , [Validators.required, Validators.maxLength(100)]],
    categoryId : [null , Validators.required],
    priority: ['', Validators.required]
  })

  isLoading: boolean = false;
  errorMessage: string = '';

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }
    this.isLoading = true;

    this.ticketService.createTicket(this.ticketForm.value).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.router.navigate(['/tickets']);
        } else {
          this.errorMessage = 'Failed to create ticket. Please try again.';
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while creating the ticket. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
