import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  private jobs = JSON.parse(localStorage.getItem('jobs') || '[]');

  getCurrentUser() {
    return this.currentUser;
  }

  constructor() {}

  register(user: any): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return of({ success: true });
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) =>
        u.email === credentials.username && u.password === credentials.password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of({ success: true });
    } else {
      return of({ success: false, message: 'Invalid credentials' });
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  updateUser(user: any): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.email === user.email);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true; 
    }
    return false; 
  }

  getUserRole(): string {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.role : '';
  }

  getJobs() {
    return JSON.parse(localStorage.getItem('jobs') || '[]');
  }

  addJob(job: any) {
    const jobs = this.getJobs();
    jobs.push(job);
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  updateJob(updatedJob: any) {
    const jobs = this.getJobs();
    const index = jobs.findIndex((job: any) => job.id === updatedJob.id);
    if (index !== -1) {
      jobs[index] = updatedJob;
      localStorage.setItem('jobs', JSON.stringify(jobs));
    }
  }

  deleteJob(jobId: number): void {
    this.jobs = this.jobs.filter((job: any) => job.id !== jobId);
    localStorage.setItem('jobs', JSON.stringify(this.jobs));
  }

  getUsersByRole(role: string): any[] {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.filter((user: any) => user.role === role);
  }
}
