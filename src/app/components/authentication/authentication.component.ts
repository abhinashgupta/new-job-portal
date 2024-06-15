import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  login() {
    if (this.username && this.password) {
      this.authService
        .login({ username: this.username, password: this.password })
        .subscribe(
          (response: any) => {
            // Adjust the type of response to any
            if (response.success) {
              const currentUser = this.authService.getCurrentUser();
              if (currentUser.role === 'jobseeker') {
                this.router.navigate(['/job-seeker-profile']);
              } else if (currentUser.role === 'recruiter') {
                this.router.navigate(['/recruiter-dashboard']);
              } else {
                this.errorMessage = 'Invalid role'; 
              }
            } else {
              this.errorMessage = response.message || 'Login failed'; 
            }
          },
          (error) => {
            console.log('Login failed', error);
            this.errorMessage = 'Login failed'; 
          }
        );
    } else {
      this.errorMessage = 'Username and password are required';
    }
  }

  logout() {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isJobSeeker(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser && currentUser.role === 'jobseeker';
  }

  isRecruiter(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser && currentUser.role === 'recruiter';
  }
}
