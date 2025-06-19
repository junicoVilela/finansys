import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { PreloadAllModules, provideRouter, withPreloading } from "@angular/router";
import { APP_ROUTES } from "./app/app-routing";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ToastrModule } from "ngx-toastr";
import { provideNgxMask } from "ngx-mask";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatToolbarModule, ToastrModule.forRoot()),
        provideNgxMask(),
        provideAnimations(),
        provideHttpClient(
            withFetch()
        ),
        provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))
    ]
})
  .catch(err => console.error(err));
