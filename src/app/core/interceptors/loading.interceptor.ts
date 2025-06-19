import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Não mostrar loading para requisições de recursos específicos
    if (request.url.includes('/assets/')) {
      return next.handle(request);
    }

    this.loadingService.show();

    return next.handle(request).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
} 