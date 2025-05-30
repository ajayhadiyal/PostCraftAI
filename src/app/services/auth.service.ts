import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { ApiService } from "./api.service";
import { API } from "../core/constant/api";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "user_data";
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) {}

  login(data: any): Observable<any> {
    return this.apiService.post<any>(`${API.LOGIN}`, data);
  }

  signUp(data: any): Observable<any> {
    return this.apiService.post<any>(`${API.REGISTER}`, data);
  }

  logout(): void {
    localStorage.removeItem("accessToken");
    this.router.navigate(["/signin"]);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  updateUser(user: Partial<User>): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...user };
      localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
      this.currentUserSubject.next(updatedUser);
    }
  }
}
