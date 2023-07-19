import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  masterPassword: string = '';
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Subscribe to the authentication status changes
    this.authService.isAuthenticated().pipe(
      tap(isAuthenticated => {
        // Perform some action based on the isAuthenticated value
        this.isAuthenticated = isAuthenticated
      })
    ).subscribe();
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  submitCode(): void {
    this.authService.login(this.masterPassword);

    setTimeout(() => {
      this.authService.isAuthenticated().pipe(
        tap(isAuthenticated => {
          // Perform some action based on the isAuthenticated value
          if (isAuthenticated) {
            this.router.navigate(['/dashboard']);
            console.log('User is authenticated');
          } else {
            console.log('User is not authenticated');
          }
        })
      ).subscribe();

      // this.authService.isAuthenticated().subscribe((result) => {
      //   console.log(result);
      //   if(result) {
      //     console.log('Login successful!');
      //     this.router.navigate(['/dashboard']);
      //   }
      // }, (error) => {
      //   console.error("Is Authenticated Error:", error);
      // })
    }, 1000); // Delay the navigation by 1 second (adjust the timeout as needed)
  }
}
