import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Ticket } from '../../shared/models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/ticket`;

  getTickets() : Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(this.apiUrl);
  }

}
