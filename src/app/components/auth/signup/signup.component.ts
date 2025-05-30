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
  isLoading = false;

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

  ngOnInit() {}

  async onSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const data = this.signUpForm.value;
    await this.notifyService.show();
    await this.authService.signUp(data).subscribe({
      next: async (data) => {
        console.log(data)
        await this.notifyService.remove();
        this.router.navigate(["/home"]);
      },
      error: async (err) => {
        await this.notifyService.remove();
        console.error(" sign up error:", err);
      },
    });
  }
}
