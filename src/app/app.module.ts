import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListingsComponent } from './components/job-listings/job-listings.component';
import { JobSeekerProfileComponent } from './components/job-seeker-profile/job-seeker-profile.component';
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthenticationService } from './services/authentication.service';
import { JobListingService } from './services/job-listing.service';

import { RegisterComponent } from './components/register/register.component';
import { JobSeekerProfileListComponent } from './components/job-seeker-profile-list/job-seeker-profile-list.component';



@NgModule({
  declarations: [
    AppComponent,
    JobListingsComponent,
    JobSeekerProfileComponent,
    RecruiterDashboardComponent,
    AuthenticationComponent,
    RegisterComponent,
    JobSeekerProfileListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  providers: [
    AuthenticationService,
    JobListingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
