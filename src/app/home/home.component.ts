import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  masterPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  submitCode(): void {
    this.authService.login(this.masterPassword);
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000); // Delay the navigation by 1 second (adjust the timeout as needed)
  }
}
