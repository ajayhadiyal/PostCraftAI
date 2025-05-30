import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  isLoading: boolean = false;
  isSaving: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      profilePicture: ['']
    });
  }
  
  ngOnInit(): void {
    this.isLoading = true;
    
    this.authService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
        if (user) {
          this.profileForm.patchValue({
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture
          });
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load user profile.';
      }
    });
  }
  
  saveProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }
    
    this.isSaving = true;
    this.successMessage = null;
    this.errorMessage = null;
    
    const updatedUser: Partial<User> = {
      name: this.profileForm.get('name')?.value,
      email: this.profileForm.get('email')?.value,
      profilePicture: this.profileForm.get('profilePicture')?.value
    };
    
    // In a real app, this would be an API call
    setTimeout(() => {
      try {
        this.authService.updateUser(updatedUser);
        this.successMessage = 'Profile updated successfully!';
        this.isSaving = false;
      } catch (error) {
        this.errorMessage = 'Failed to update profile. Please try again.';
        this.isSaving = false;
      }
    }, 1000);
  }
}