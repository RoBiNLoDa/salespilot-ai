import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly STORAGE_KEY = 'access_token';

  save(token: string): void {
    localStorage.setItem(this.STORAGE_KEY, token);
  }

  get(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  remove(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  hasToken(): boolean {
    return this.get() !== null;
  }
}