import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-seeker-profile-list',
  templateUrl: './job-seeker-profile-list.component.html',
  styleUrls: ['./job-seeker-profile-list.component.css'],
})
export class JobSeekerProfileListComponent implements OnInit {
  jobSeekers: any[] = [];
  searchForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
  }

  ngOnInit(): void {
    this.jobSeekers = this.authService.getUsersByRole('jobseeker'); 
  }

  searchJobSeekers() {
    const searchTerm = this.searchForm.value.searchTerm.toLowerCase().trim();

    if (!searchTerm) {
      this.jobSeekers = this.authService.getUsersByRole('jobseeker'); 
      return;
    }

    this.jobSeekers = this.authService
      .getUsersByRole('jobseeker')
      .filter(
        (jobseeker: any) =>
          jobseeker.skills.some((skill: any) =>
            skill.name.toLowerCase().includes(searchTerm)
          ) ||
          jobseeker.education.some((edu: any) =>
            edu.degree.toLowerCase().includes(searchTerm)
          ) ||
          jobseeker.workExperience.some((work: any) =>
            work.title.toLowerCase().includes(searchTerm)
          )
      );
  }

  getSkills(jobSeeker: any): string {
    return jobSeeker.skills.map((skill:any) => skill.name).join(', ');
  }

  getEducation(jobSeeker: any): string {
    return jobSeeker.education.map((edu:any) => edu.degree).join(', ');
  }

  getWorkExperience(jobSeeker: any): string {
    return jobSeeker.workExperience.map((work:any) => work.title).join(', ');
  }
}
