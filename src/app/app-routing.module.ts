import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { JobListingsComponent } from './components/job-listings/job-listings.component';
import { JobSeekerProfileComponent } from './components/job-seeker-profile/job-seeker-profile.component';
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { JobSeekerProfileListComponent } from './components/job-seeker-profile-list/job-seeker-profile-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/job-listings', pathMatch: 'full' },
  { path: 'login', component: AuthenticationComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'job-listings', component: JobListingsComponent },
  { path: 'job-seeker-profile', component: JobSeekerProfileComponent },
  { path: 'job-seeker-profile-list', component: JobSeekerProfileListComponent },
  { path: 'recruiter-dashboard', component: RecruiterDashboardComponent },
  { path: '**', redirectTo: '/job-listings' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
