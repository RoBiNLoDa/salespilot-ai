import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { LoginRequest } from '../models/login-request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TokenService } from './token.service';
import { AuthResponse } from '../models/auth_response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _currentUser = signal<User | null>(null);
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;
  private readonly tokenService = inject(TokenService);

  readonly currentUser = this._currentUser.asReadonly();

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/auth/login`, request);
  }

  logout(): void {
    this.tokenService.remove();
    this._currentUser.set(null);
  }

  storeToken(token: string): void {
    this.tokenService.save(token);
  }

  me(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.api}/auth/me`);
  }

}
