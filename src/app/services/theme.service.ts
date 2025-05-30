import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app_theme';
  private isDarkSubject = new BehaviorSubject<boolean>(false);
  
  isDark$ = this.isDarkSubject.asObservable();

  constructor() {}

  initTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDark = savedTheme 
      ? savedTheme === 'dark'
      : prefersDark;
    
    this.setTheme(isDark ? 'dark' : 'light');
  }

  toggleTheme(): void {
    const isDark = this.isDarkSubject.value;
    this.setTheme(isDark ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_KEY, theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDarkSubject.next(true);
    } else {
      document.documentElement.classList.remove('dark');
      this.isDarkSubject.next(false);
    }
  }
}