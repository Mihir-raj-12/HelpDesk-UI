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
}
