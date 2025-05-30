import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CallbackComponent } from "./components/auth/callback/callback.component";
import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { PostGeneratorComponent } from "./components/post-generator/post-generator.component";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
  { path: "", redirectTo: "/signin", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "auth/callback", component: CallbackComponent },
  { path: "post/create", component: PostGeneratorComponent },
  { path: "profile", component: ProfileComponent },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
