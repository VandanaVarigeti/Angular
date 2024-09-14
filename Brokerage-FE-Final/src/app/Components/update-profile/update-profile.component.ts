import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProfileService } from '../../services/customer-profile-service.service';

import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NavBarComponent, CommonModule],
  providers: [CustomerProfileService],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  customerId!: number;
  ssn!:number;
  usStates: string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
    "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
    "VT", "VA", "WA", "WV", "WI", "WY"]; // Example list of states
  restrictedCountries: string[] = ['Sudan', 'Iran'];
  constructor(
    private fb: FormBuilder,
    private profileService: CustomerProfileService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.profileForm = this.fb.group({
      // Personal Information
      ssnNumber: ['',Validators.required],
      firstName:['', [Validators.pattern('^[A-Za-z]+$')]],
      middleName: [''],
      lastName:  ['', [Validators.pattern('^[A-Za-z]+$')]],
      title: [''],
      // Address 1
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: ['', [ Validators.pattern('^[0-9]{5}$')]],
      // Address 2
      address2Line1: [''],
      address2Line2: [''],
      city2: [''],
      state2: [''],
      country2: [''],
      zipCode2: [''],
      internationalAddressIndicator2: [''],
      // Address 3
      address3Line1: [''],
      address3Line2: [''],
      city3: [''],
      state3: [''],
      country3: [''],
      zipCode3: [''],
      internationalAddressIndicator3: [''],
      // Other Information
      // phoneNumberType: ['', Validators.required],
      phoneNumber:  ['', [ this.usPhoneNumberValidator]],
      // landlineNumber: ['', this.landlineNumberValidator],
      internationalPhoneNumber: [''],
      emailAddress: ['', [ Validators.email]],
      citizenship1:  [{ value: 'US', disabled: true }],
      citizenship2: [''],
      residentCountry: ['', [ this.restrictedCountryValidator.bind(this)]],
      politicallyInfluencedPerson: [''],
      financialObjective: ['']
    });
  }
  ngOnInit(): void {
    this.customerId = +this.route.snapshot.paramMap.get('id')!;
  
    this.profileService.getProfile(this.customerId).subscribe(data => {
      this.profileForm.patchValue(data);
    });
  }
  onSubmit(): void {
    if (this.profileForm.valid) {
      
      this.profileService.updateProfile(this.profileForm.get('ssnNumber')?.value, this.profileForm.value).subscribe( response => {
        console.log('Profile updated successfully');
      },
      error => {
        console.error('Error updating profile:', error);
      }
    );
    } else {
      console.error('Form is invalid');
    }
  }
  usPhoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    if (phoneNumber && !/^\+1\d{10}$/.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }
  // landlineNumberValidator(control: AbstractControl): ValidationErrors | null {
  //   const landlineNumber = control.value;
  //   if (landlineNumber && !/^\d{8}$/.test(landlineNumber)) {
  //     return { invalidLandlineNumber: true };
  //   }
  //   return null;
  // }
  restrictedCountryValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim().toLowerCase();
    if (this.restrictedCountries.some(country => country.toLowerCase() === value)) {
      return { restrictedCountry: true };
    }
    return null;
  }
  }