import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser.role === 'jobseeker') {
        this.router.navigate(['/job-seeker-profile']);
      } else if (currentUser.role === 'recruiter') {
        this.router.navigate(['/recruiter-dashboard']);
      }
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isJobSeeker(): boolean {
    return this.authService.getUserRole() === 'jobseeker';
  }

  isRecruiter(): boolean {
    return this.authService.getUserRole() === 'recruiter';
  }
}
