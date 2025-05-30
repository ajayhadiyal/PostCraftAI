import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { NotifyService } from "../../../services/notify.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
  standalone: false,
})
export class SignupComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifyService: NotifyService
  ) {
    this.signUpForm = this.fb.group({
      fullname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSignup() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.notifyService.show();
    const data = this.signUpForm.value;
    this.authService.signUp(data).subscribe({
      next: (res) => {
        this.notifyService.remove();
        console.log(res);
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        this.notifyService.remove();
        console.log("error", err);
      },
    });
  }
}
