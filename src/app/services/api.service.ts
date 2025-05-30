import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://11vh5j8t-8000.inc1.devtunnels.ms/';

  constructor(private http: HttpClient) {}

  // ✅ GET method
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  // ✅ POST method
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  // ✅ PUT method
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  // ✅ DELETE method
  delete<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { params });
  }
}
