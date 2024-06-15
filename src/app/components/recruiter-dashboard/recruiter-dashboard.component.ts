import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css'],
})
export class RecruiterDashboardComponent implements OnInit {
  recruiter: any;
  jobForm: FormGroup;
  jobs: any[] = [];
  editingJobId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      postedDate: [
        new Date().toISOString().substring(0, 10),
        Validators.required,
      ],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      type: ['', Validators.required],
      industry: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.recruiter = this.authService.getCurrentUser();
    this.jobs = this.authService.getJobs();
  }

  postJob() {
    if (this.jobForm.valid) {
      const newJob = {
        ...this.jobForm.value,
        id: this.editingJobId || Date.now(), 
        recruiterId: this.recruiter.id,
      };

      if (this.editingJobId) {
        this.authService.updateJob(newJob);
      } else {
        this.authService.addJob(newJob);
      }

      this.jobs = this.authService.getJobs(); 
      this.jobForm.reset();
      this.jobForm.patchValue({
        postedDate: new Date().toISOString().substring(0, 10),
      }); 
      this.editingJobId = null; 
    }
  }

  editJob(job: any) {
    this.editingJobId = job.id;
    this.jobForm.patchValue(job);
  }

  deleteJob(jobId: number) {
    this.authService.deleteJob(jobId);
    this.jobs = this.authService.getJobs(); 
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
