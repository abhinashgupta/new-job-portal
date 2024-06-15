import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-seeker-profile',
  templateUrl: './job-seeker-profile.component.html',
  styleUrls: ['./job-seeker-profile.component.css'],
})
export class JobSeekerProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: any;
  editing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      education: this.fb.array([]),
      skills: this.fb.array([]),
      workExperience: this.fb.array([]),
      profilePicture: [null],
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.profileForm.patchValue(this.currentUser);

    this.currentUser.education.forEach((edu: any) => this.addEducation(edu));
    this.currentUser.skills.forEach((skill: any) => this.addSkill(skill));
    this.currentUser.workExperience.forEach((work: any) =>
      this.addWorkExperience(work)
    );
  }

  get education(): FormArray {
    return this.profileForm.get('education') as FormArray;
  }

  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  get workExperience(): FormArray {
    return this.profileForm.get('workExperience') as FormArray;
  }

  addEducation(edu: any = {}) {
    this.education.push(
      this.fb.group({
        degree: [edu.degree || '', Validators.required],
        university: [edu.university || '', Validators.required],
        year: [edu.year || '', Validators.required],
      })
    );
  }

  addSkill(skill: any = {}) {
    this.skills.push(
      this.fb.group({
        name: [skill.name || '', Validators.required],
      })
    );
  }

  addWorkExperience(work: any = {}) {
    this.workExperience.push(
      this.fb.group({
        title: [work.title || '', Validators.required],
        company: [work.company || '', Validators.required],
        startDate: [work.startDate || '', Validators.required],
        endDate: [work.endDate || '', Validators.required],
        description: [work.description || ''],
      })
    );
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileForm.patchValue({
          profilePicture: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const updatedUser = {
        ...this.currentUser,
        ...this.profileForm.value,
        profilePicture: this.profileForm.get('profilePicture')?.value,
      };
      this.authService.updateUser(updatedUser);

      this.currentUser = updatedUser;
      this.editing = false;
    }
  }

  editProfile() {
    this.editing = true;
  }

  cancelEdit() {
    this.editing = false;
    this.profileForm.patchValue(this.currentUser);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
