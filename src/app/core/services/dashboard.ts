import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response.model';
import { DashboardStats } from '../../shared/models/dashboard.model';


@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiurl = `${environment.apiUrl}/dashboard`;

  getStats() : Observable<ApiResponse<DashboardStats>>{
    return this.http.get<ApiResponse<DashboardStats>>(`${this.apiurl}/stats`);
  }

}
