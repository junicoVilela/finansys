import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiPath = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredAuth();
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<any>(`${this.apiPath}/login`, request).pipe(
      delay(1000), // Simula latência da rede
      map(response => {
        if (response && response.user) {
          const user = User.fromJson(response.user);
          const authResponse: AuthResponse = {
            user,
            token: response.token || this.generateFakeToken(),
            message: response.message || 'Login realizado com sucesso!'
          };
          this.setAuth(authResponse);
          return authResponse;
        }
        throw new Error('Credenciais inválidas');
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Email ou senha incorretos'));
      })
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    if (request.password !== request.confirmPassword) {
      return throwError(() => new Error('As senhas não coincidem'));
    }

    return this.http.post<any>(`${this.apiPath}/register`, request).pipe(
      delay(1000), // Simula latência da rede
      map(response => {
        if (response && response.user) {
          const user = User.fromJson(response.user);
          const authResponse: AuthResponse = {
            user,
            token: response.token || this.generateFakeToken(),
            message: response.message || 'Cadastro realizado com sucesso!'
          };
          this.setAuth(authResponse);
          return authResponse;
        }
        throw new Error('Erro ao criar conta');
      }),
      catchError(error => {
        console.error('Register error:', error);
        if (error.status === 409) {
          return throwError(() => new Error('Este email já está em uso'));
        }
        return throwError(() => new Error('Erro ao criar conta. Tente novamente.'));
      })
    );
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<{ message: string }> {
    return this.http.post<any>(`${this.apiPath}/forgot-password`, request).pipe(
      delay(1000), // Simula latência da rede
      map(response => ({
        message: response.message || 'Instruções enviadas para seu email!'
      })),
      catchError(error => {
        console.error('Forgot password error:', error);
        if (error.status === 404) {
          return throwError(() => new Error('Email não encontrado'));
        }
        return throwError(() => new Error('Erro ao enviar email. Tente novamente.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  private setAuth(authResponse: AuthResponse): void {
    localStorage.setItem('auth_token', authResponse.token);
    localStorage.setItem('current_user', JSON.stringify(authResponse.user));
    this.currentUserSubject.next(authResponse.user);
    this.isAuthenticatedSubject.next(true);
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem('auth_token');
    const userJson = localStorage.getItem('current_user');
    
    if (token && userJson) {
      try {
        const user = User.fromJson(JSON.parse(userJson));
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        console.error('Error loading stored auth:', error);
        this.logout();
      }
    }
  }

  private generateFakeToken(): string {
    return 'fake-jwt-token-' + Math.random().toString(36).substr(2, 9);
  }
} 