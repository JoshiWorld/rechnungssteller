import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderAuthService {
  private tokenKey = 'token';

  getToken(): string {
    // @ts-ignore
    return sessionStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  login(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  constructor() { }
}
