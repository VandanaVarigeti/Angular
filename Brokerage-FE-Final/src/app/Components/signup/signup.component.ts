import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  personalInfoForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: [''],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      residentId: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}[0-9]{8}$/)]],
      dateOfBirth: ['', [Validators.required, this.minimumAgeValidator(18)]],
      loginId: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
      phoneNumberType: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      landlineNumber: ['', [Validators.pattern(/^[0-9]{8}$/)]]
    });
  }
 // Custom validator for minimum age
  minimumAgeValidator(minAge: number) {
    return (control: any) => {
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return { tooYoung: true };
      }
      return age >= minAge ? null : { tooYoung: true };
    };
  }
  onSubmit(): void {
    if (this.personalInfoForm.valid) {
      console.log('Form Submitted', this.personalInfoForm.value);
    
    } else {
      console.log('Form is not valid');
    }
  }

  get firstName() { return this.personalInfoForm.get('firstName'); }
  get lastName() { return this.personalInfoForm.get('lastName'); }
  get email() { return this.personalInfoForm.get('email'); }
  get residentId() { return this.personalInfoForm.get('residentId'); }
  get dateOfBirth() { return this.personalInfoForm.get('dateOfBirth'); }
  get loginId() { return this.personalInfoForm.get('loginId'); }
  get password() { return this.personalInfoForm.get('password'); }
  get addressLine1() { return this.personalInfoForm.get('addressLine1'); }
  get city() { return this.personalInfoForm.get('city'); }
  get state() { return this.personalInfoForm.get('state'); }
  get zipcode() { return this.personalInfoForm.get('zipcode'); }
  get phoneNumberType() { return this.personalInfoForm.get('phoneNumberType'); }
  get mobileNumber() { return this.personalInfoForm.get('mobileNumber'); }
  get landlineNumber() { return this.personalInfoForm.get('landlineNumber');

}

}