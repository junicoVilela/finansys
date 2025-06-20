import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { PreloadAllModules, provideRouter, withPreloading } from "@angular/router";
import { routes } from "./app/app-routing";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { provideNgxMask } from "ngx-mask";
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from './app/in-memory-database';

import { ErrorInterceptor } from './app/core/interceptors/error.interceptor';
import { LoadingInterceptor } from './app/core/interceptors/loading.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        // HttpClient deve vir primeiro
        provideHttpClient(),
        
        // Depois os módulos importados
        importProvidersFrom(
            BrowserModule, 
            ToastrModule.forRoot(),
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase, { 
                delay: 500,
                passThruUnknownUrl: true,
                dataEncapsulation: false
            })
        ),
        
        // Outros providers
        provideNgxMask(),
        provideAnimations(),
        
        // Interceptors
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        
        // Router por último
        provideRouter(routes, withPreloading(PreloadAllModules))
    ]
})
  .catch(err => console.error(err));
