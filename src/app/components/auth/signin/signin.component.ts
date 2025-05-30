import { Component } from "@angular/core";
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
export class SigninComponent {
  loginForm: FormGroup;
  isLoading = false;

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

  onSignin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.notifyService.show();
    const data = this.loginForm.value;
    this.authService.login(data).subscribe({
      next: (res) => {
        localStorage.setItem("accessToken", res.access);
        this.notifyService.remove();
        this.router.navigate(["/home"]);
      },
      error: () => {
        this.notifyService.remove();        
      },
    });
  }
}
