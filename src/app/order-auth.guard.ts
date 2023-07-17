import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OrderAuthService } from './order-auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderAuthGuard implements CanActivate {
  constructor(private authService: OrderAuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
}
