import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Loading } from "notiflix/build/notiflix-loading-aio";

@Injectable({
  providedIn: "root",
})
export class NotifyService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  show(message: string = "Loading...") {
    if (isPlatformBrowser(this.platformId)) {
      Loading.hourglass(message);
    }
  }

  remove() {
    if (isPlatformBrowser(this.platformId)) {
      Loading.remove();
    }
  }
}
