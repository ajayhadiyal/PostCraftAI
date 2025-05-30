import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
  standalone: false,
})
export class SignupComponent {
  signUpForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      fullname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  onSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.isLoading = true; 
    const data = this.signUpForm.value;

    this.authService.signUp(data).subscribe({
      next: (user) => {
        console.log("Signup successful:", user);
        this.isLoading = false;
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Signup error:", err);
      },
    });
  }
}
