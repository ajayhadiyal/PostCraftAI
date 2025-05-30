import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { HomeComponent } from "./components/home/home.component";
import { PostGeneratorComponent } from "./components/post-generator/post-generator.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { authGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/signin", pathMatch: "full" },
  { path: "home", component: HomeComponent,
    canActivate: [authGuard]
   },
  { path: "signin", component: SigninComponent},
  { path: "signup", component: SignupComponent },
  { path: "post/create", component: PostGeneratorComponent,
    canActivate: [authGuard] },
  { path: "profile", component: ProfileComponent,
    canActivate: [authGuard] },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
