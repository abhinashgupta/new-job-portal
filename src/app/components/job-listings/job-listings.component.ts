import { Component, OnInit } from '@angular/core';
import { JobListingService } from 'src/app/services/job-listing.service';

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.css'],
})
export class JobListingsComponent implements OnInit {
  jobListings: any[] = [];

  constructor(private jobListingService: JobListingService) {}

  ngOnInit(): void {
    this.loadJobListings();
  }

  loadJobListings() {
    this.jobListingService.getJobListings().subscribe(
      (data) => {
        this.jobListings = data;
      },
      (error) => {
        console.log('Error fetching job listings', error);
      }
    );
  }
}
