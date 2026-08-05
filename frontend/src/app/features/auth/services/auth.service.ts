import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { LoginRequest } from '../models/login-request';
import { Observable, switchMap, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { API } from '@core/config/application.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _currentUser = signal<User | null>(null);
  private readonly http = inject(HttpClient);
  private readonly apiAuth = API.auth;
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router)

  readonly currentUser = this._currentUser.asReadonly();

  login(request: LoginRequest): Observable<User> {
    return this.http.post<LoginResponse>(`${this.apiAuth}/login`, request).pipe(
      tap(response => this.tokenService.save(response.access_token)),
      switchMap(() => this.me()),
      tap(user => this._currentUser.set(user))
    );
  }

  logout(): void {
    this.tokenService.remove();
    this._currentUser.set(null);
    this.router.navigate(['/login'])
  }

  storeToken(token: string): void {
    this.tokenService.save(token);
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.apiAuth}/me`);
  }

  initialize(): void {
    if (!this.tokenService.get()) {
      return;
    }

    this.me().subscribe({
      next: (user) => {
        this._currentUser.set(user);
      },
      error: () => {
        this.logout();
      },
    });
  }
}
