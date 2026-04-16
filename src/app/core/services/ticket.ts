import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Ticket } from '../../shared/models/ticket.model';
import { Comment } from '../../shared/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/ticket`;

  getTickets() : Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(this.apiUrl);
  }

  getTicketById(id : number):Observable<ApiResponse<Ticket>>{
    return this.http.get<ApiResponse<Ticket>>(`${this.apiUrl}/getById?id=${id}`);
  }

  createTicket(data : any) : Observable<ApiResponse<Ticket>>{
    return this.http.post<ApiResponse<Ticket>>(this.apiUrl, data);
  }

  updateTicketStatus(ticketId : number , status :string) : Observable<ApiResponse<boolean>>{
    const payload = { ticketId, status };
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/status`, payload);
  }

  updateTicketPriority(ticketId : number , priority : string) : Observable<ApiResponse<boolean>>{
    const payload = { ticketId, priority };
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/priority`, payload);
  }

getSupportAgents(): Observable<ApiResponse<any[]>> {
    
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/User/agents`);
  }

  assignTicket(ticketId: number, agentId: string): Observable<ApiResponse<boolean>> {
    const payload = { ticketId, agentId };
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/assign`, payload);
  }

  getComments(ticketId: number): Observable<ApiResponse<Comment[]>> {
    return this.http.get<ApiResponse<Comment[]>>(`${environment.apiUrl}/Comment/getByTicketId?ticketId=${ticketId}`);
  }

  // 2. Post a new message
  addComment(payload: { ticketId: number, content: string }): Observable<ApiResponse<Comment>> {
    return this.http.post<ApiResponse<Comment>>(`${environment.apiUrl}/Comment`, payload);
  }

}
