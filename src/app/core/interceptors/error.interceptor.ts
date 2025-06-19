import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    if (environment.enableLogs) {
      console.error('HTTP Error:', error);
    }

    let errorMessage = 'Ocorreu um erro inesperado';
    
    switch (error.status) {
      case 0:
        errorMessage = 'Erro de conexão. Verifique sua internet.';
        break;
      case 400:
        errorMessage = 'Dados inválidos enviados.';
        break;
      case 401:
        errorMessage = 'Acesso negado. Faça login novamente.';
        this.router.navigate(['/login']);
        break;
      case 403:
        errorMessage = 'Você não tem permissão para esta ação.';
        break;
      case 404:
        errorMessage = 'Recurso não encontrado.';
        break;
      case 422:
        if (error.error?.errors) {
          return; // Deixa o componente tratar erros de validação
        }
        errorMessage = 'Dados inválidos.';
        break;
      case 500:
        errorMessage = 'Erro interno do servidor.';
        break;
      case 503:
        errorMessage = 'Serviço temporariamente indisponível.';
        break;
    }

    this.toastr.error(errorMessage, 'Erro');
  }
} 