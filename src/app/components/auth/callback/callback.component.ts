import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
  standalone: false
})
export class CallbackComponent implements OnInit {
  isLoading: boolean = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    // Get the code from the URL
    const code = this.route.snapshot.queryParams['code'];
    const returnUrl = this.route.snapshot.queryParams['state'] || '/';
    
    if (!code) {
      this.error = 'Authentication failed. No authorization code received.';
      this.isLoading = false;
      return;
    }
    
    this.authService.handleCallback(code).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigateByUrl(returnUrl);
        } else {
          this.error = 'Authentication failed. Please try again.';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Authentication error:', err);
        this.error = 'An error occurred during authentication. Please try again.';
        this.isLoading = false;
      }
    });
  }
}