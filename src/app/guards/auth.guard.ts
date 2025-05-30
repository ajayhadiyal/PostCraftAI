import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const isPlatform = inject(PLATFORM_ID);
  const router = inject(Router);
  let isAuthanticated = false;
  if (isPlatformBrowser(isPlatform)) {
    isAuthanticated = !!localStorage.getItem("accessToken");
  }

  if (!isAuthanticated) {
    return router.navigate(["/signin"]);
  }

  return true;
};
