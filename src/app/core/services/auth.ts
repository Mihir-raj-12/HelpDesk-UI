import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../shared/models/auth.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Auth`;
  private router = inject(Router);

  login(request: LoginRequest) : Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, request);
  }

  logout(): void {
    // 1. Destroy the token
    localStorage.removeItem('token');
    // 2. Kick the user back to the login screen
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;  
    try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role;
    } catch(e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  getUserName(): string {
    const token = this.getToken();
    if (!token) return 'HelpDesk User';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // ClaimTypes.Name in C# usually translates to this specific URL in the JWT payload, or "unique_name"
      return payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] 
          || payload.unique_name 
          || payload.name 
          || 'HelpDesk User';
    } catch (e) {
      return 'HelpDesk User';
    }
  }


  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }
}
