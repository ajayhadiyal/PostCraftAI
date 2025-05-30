import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
  standalone: false
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'white' = 'primary';
  
  get spinnerClasses(): string {
    const sizeClasses = {
      'sm': 'w-5 h-5',
      'md': 'w-8 h-8',
      'lg': 'w-12 h-12'
    };
    
    const colorClasses = {
      'primary': 'text-primary-500',
      'white': 'text-white'
    };
    
    return `${sizeClasses[this.size]} ${colorClasses[this.color]}`;
  }
}