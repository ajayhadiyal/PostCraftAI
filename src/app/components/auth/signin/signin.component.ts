import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
  standalone: false,
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const data = this.loginForm.value;
    this.authService.login(data).subscribe({
      next: (user) => {
        console.log(user)
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        this.errorMessage = "Invalid username or password.";
        console.error("Login error:", err);
      },
    });
  }
}
