import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = ''; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['jobseeker', Validators.required],
      education: this.fb.array([]),
      skills: this.fb.array([]),
      workExperience: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.onRoleChange();
  }

  get education(): FormArray {
    return this.registerForm.get('education') as FormArray;
  }

  get skills(): FormArray {
    return this.registerForm.get('skills') as FormArray;
  }

  get workExperience(): FormArray {
    return this.registerForm.get('workExperience') as FormArray;
  }

  addEducation() {
    this.education.push(
      this.fb.group({
        degree: ['', Validators.required],
        university: ['', Validators.required],
        year: ['', Validators.required],
      })
    );
  }

  addSkill() {
    this.skills.push(
      this.fb.group({
        name: ['', Validators.required],
      })
    );
  }

  addWorkExperience() {
    this.workExperience.push(
      this.fb.group({
        title: ['', Validators.required],
        company: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        description: [''],
      })
    );
  }

  onRoleChange() {
    const roleControl = this.registerForm.get('role');
    roleControl?.valueChanges.subscribe((role) => {
      if (role === 'recruiter') {
        this.education.clear();
        this.skills.clear();
        this.workExperience.clear();
      } else {
        this.addEducation();
        this.addSkill();
        this.addWorkExperience();
      }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, role } = this.registerForm.value;
      let user: any = { email, password, role };

      if (role === 'jobseeker') {
        user = {
          ...user,
          education: this.education.value,
          skills: this.skills.value,
          workExperience: this.workExperience.value,
        };
      }

      this.authService.register(user).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error: any) => {
          this.errorMessage = error.message;
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get role() {
    return this.registerForm.get('role');
  }
}
