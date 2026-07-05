import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _currentUser = signal<User | null>(null);

  readonly currentUser = this._currentUser.asReadonly();

  login(email: string, password: string): boolean {
    this._currentUser.set({
      id: 1,
      name: 'Robinson Loaiza',
      email,
    });

    return true

  }

  logout() {
    this._currentUser.set(null);
  }
}
