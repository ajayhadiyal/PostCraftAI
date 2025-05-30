import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { NotifyService } from "../../../services/notify.service";

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
    private authService: AuthService,
    private notifyService: NotifyService
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const data = this.loginForm.value;
    await this.notifyService.show();
    await this.authService.login(data).subscribe({
      next: async (res) => {
        localStorage.setItem('accessToken', res.access);
        await this.notifyService.remove();
        this.router.navigate(["/home"]);
      },
      error: async (err) => {
        await this.notifyService.remove();
        this.errorMessage = "Invalid username or password.";
        console.error("Login error:", err);
      },
    });
  }
}
