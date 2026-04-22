import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/Category`;

getAllCategories() : Observable<ApiResponse<any[]>>{
 return this.http.get<ApiResponse<any[]>>(this.apiUrl);
}

createCategory(payload : {name :string}) : Observable<ApiResponse<any>>{
  return this.http.post<ApiResponse<any>>(this.apiUrl,payload);
}

updateCategory(payload : {id : number , name : string}) : Observable<ApiResponse<boolean>>{
  return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/updateCategory`, payload);
}

deactivateCategory(id : number) : Observable<ApiResponse<boolean>>{
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put<ApiResponse<boolean>>(`${this.apiUrl}/DeactivateCategory`, id, { headers });
}


}
