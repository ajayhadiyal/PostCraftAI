import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkToken();
  }

  // Mock function - in real app, this would connect to LinkedIn OAuth
  login(username: string, password: string): void {
    // In a real app, redirect to LinkedIn OAuth
    // For demo purposes, we'll simulate a successful login
    // const redirectUrl = this.getLinkedInAuthUrl();
    // window.location.href = redirectUrl;
  }

  // Get LinkedIn auth URL
  private getLinkedInAuthUrl(): string {
    // In a real app, this would be a proper LinkedIn OAuth URL
    // For demo purposes, we'll redirect to our callback URL
    return '/auth/callback';
  }

  // Handle OAuth callback
  handleCallback(code: string): Observable<boolean> {
    // In a real app, this would exchange the code for a token
    // For demo purposes, we'll simulate a successful authentication
    
    // Simulate API call
    return this.http.get<any>('/api/auth/callback', { params: { code } })
      .pipe(
        tap(response => {
          const mockUser: User = {
            id: '12345',
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            profilePicture: 'https://randomuser.me/api/portraits/women/17.jpg',
            accessToken: 'mock_token_12345',
            linkedInId: 'linkedin_12345'
          };
          
          this.setSession(mockUser);
        }),
        map(() => true),
        catchError(() => {
          // For demo, always succeed
          const mockUser: User = {
            id: '12345',
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            profilePicture: 'https://randomuser.me/api/portraits/women/17.jpg',
            accessToken: 'mock_token_12345',
            linkedInId: 'linkedin_12345'
          };
          
          this.setSession(mockUser);
          return of(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private setSession(user: User): void {
    localStorage.setItem(this.TOKEN_KEY, user.accessToken || '');
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private checkToken(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userData = localStorage.getItem(this.USER_KEY);
    
    if (token && userData) {
      const user = JSON.parse(userData) as User;
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
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