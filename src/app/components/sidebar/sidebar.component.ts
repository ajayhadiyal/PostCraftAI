import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: false
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();
  
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
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  logout(): void {
    this.authService.logout();
    this.closeSidebar.emit();
  }
  
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
    this.closeSidebar.emit();
  }
  
  close(): void {
    this.closeSidebar.emit();
  }
}