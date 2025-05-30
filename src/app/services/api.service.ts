import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IResponse } from "../core/interface/responce";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = "https://11vh5j8t-8000.inc1.devtunnels.ms";

  constructor(private http: HttpClient) {}

  // ✅ GET method
  get<T>(endpoint: string, params?: any): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/${endpoint}`, { params });
  }

  // ✅ POST method
  post<T>(endpoint: string, body: any, options?: any) {
    return this.http.post<IResponse>(`${this.baseUrl}/${endpoint}`, body);
  }

  // ✅ PUT method
  put<T>(endpoint: string, body: any) {
    return this.http.put<IResponse>(`${this.baseUrl}/${endpoint}`, body);
  }

  // ✅ DELETE method
  delete<T>(endpoint: string, params?: any) {
    return this.http.delete<IResponse>(`${this.baseUrl}/${endpoint}`, {
      params,
    });
  }
}
