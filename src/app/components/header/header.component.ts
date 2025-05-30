import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  currentUser$: Observable<User | null>;
  isDark$: Observable<boolean>;
  
  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isDark$ = this.themeService.isDark$;
  }
  
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }
  
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
  
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
  
  navigateToPostCreator(): void {
    this.router.navigate(['/post/create']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/signin']);
  }

}