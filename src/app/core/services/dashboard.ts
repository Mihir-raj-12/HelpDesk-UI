import { inject, Injectable } from '@angular/core';
// 1. FIXED: Removed .development so Angular can handle environments dynamically
import { environment } from '../../../environments/environment'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';
import { DashboardStats } from '../../shared/models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  
  // Notice the capital 'D' just to perfectly match your C# controller name
  private apiUrl = `${environment.apiUrl}/Dashboard/stats`; 

  getStats() : Observable<ApiResponse<DashboardStats>> {
    // 2. FIXED: Removed the extra '/stats' to match standard C# routing
    // (If your C# controller specifically uses [HttpGet("stats")], you can add it back!)
    return this.http.get<ApiResponse<DashboardStats>>(this.apiUrl);
  }
}