import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  standalone: false
})
export class SigninComponent implements OnInit {
 loginForm: FormGroup;
 

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {
    // if (this.loginForm.valid) {
    //   const { username, password } = this.loginForm.value;
    //   console.log('Login details', username, password);
    //   // Call your LinkedIn API or authentication service
    // }
    this.router.navigate(['/home'])
    
  }
}
