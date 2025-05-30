import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  returnUrl: string = '/';
  isLoading: boolean = false;
  
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  login(): void {
    this.isLoading = true;
    this.authService.login();
  }
}