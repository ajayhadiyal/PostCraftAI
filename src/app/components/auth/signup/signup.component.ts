import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: false
})
export class SignupComponent {
 signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      console.log('Sign Up Data', this.signUpForm.value);
      // Handle your signup logic here (API call, routing, etc)
    }
  }
}
