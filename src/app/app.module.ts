import { provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { PostGeneratorComponent } from "./components/post-generator/post-generator.component";
import { PostPreviewComponent } from "./components/post-preview/post-preview.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LoadingSpinnerComponent } from "./components/ui/loading-spinner/loading-spinner.component";


// Interceptors
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthModule } from "./components/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    PostGeneratorComponent,
    PostPreviewComponent,
    ProfileComponent,
    HomeComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
  ],
  providers: [
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
