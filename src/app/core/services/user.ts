import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class User {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/User`;

  getAllUser(): Observable<ApiResponse<any[]>>   {

    return this.http.get<ApiResponse<any[]>>(this.apiUrl);
  }

  createUser(payload : any) : Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, payload);
  }

  updateUserRole(userId: string, newRole: string): Observable<ApiResponse<boolean>> {
    const payload = { userId, newRole };
    return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/role`, payload);
  }

  deactivateUser(userId: string): Observable<ApiResponse<boolean>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<ApiResponse<boolean>>(
      `${this.apiUrl}/DeactivateUser`, 
      `"${userId}"`, 
      { headers }
    );
  }


}
