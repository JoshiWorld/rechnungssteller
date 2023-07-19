import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// @ts-ignore
import jwt from 'jsonwebtoken';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  getToken(): string {
    // @ts-ignore
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      return of(false); // No token found, return false immediately
    }

    const url = `https://shop.brokoly.de/api/master/verify?token=${token}`;

    return this.http.get(url).pipe(
      map((response) => true),
      catchError(() => of(false))
    );
  }

  login(password: string): void {
    const url = `https://shop.brokoly.de/api/master/get?password=${password}`;

    this.http.get(url).subscribe((response) => {
      // @ts-ignore
      localStorage.setItem(this.tokenKey, response.token);
    }, (error) => {
      console.error('Error logging in:', error);
    });
  }


  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
