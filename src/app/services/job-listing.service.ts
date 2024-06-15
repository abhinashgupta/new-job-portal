import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobListingService {
  private localStorageKey = 'jobs';

  constructor() {}

  getJobListings(): Observable<any[]> {
    const jobListings = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]'
    );
    return of(jobListings);
  }

  saveJobListings(jobListings: any[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(jobListings));
  }
}
