import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
//import { CustomerService } from '../../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedDataService } from '../../services/shared-data.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
selector: 'app-add-customer',
standalone: true,
imports: [ReactiveFormsModule, CommonModule, HttpClientModule, RouterModule, NavBarComponent],
providers: [CustomerService],
templateUrl: './add-customer.component.html',
styleUrls: ['./add-customer.component.css'],

})
export class AddCustomerComponent  {
  [x: string]: any;
  form: FormGroup;
  usStates: string[] = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
                "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
                "VT", "VA", "WA", "WV", "WI", "WY"]; // Example list of states
  restrictedCountries: string[] = ['Sudan', 'Iran'];
  constructor(private fb: FormBuilder,
    private customerService:CustomerService,private snackBar:MatSnackBar,
    private router: Router, private sharedDataService: SharedDataService
  ) {
    this.form = this.fb.group({
      ssnNumber: ['',Validators.required],
      firstName: ['', [Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      middleName: [''],
      lastName: ['', [Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      title: [''],
      // addresses: this.fb.array([], this.maxAddressesValidator(2)),
      addresses: this.fb.array([]),
      phoneNumber: ['', [Validators.required, this.usPhoneNumberValidator]],
      internationalPhoneNumber: [''],
      emailAddress: ['', [Validators.required, Validators.email]],
      citizenship1: [{ value: 'US', disabled: true }, Validators.required],
      citizenship2: [''],
      residentCountry: ['', [Validators.required, this.restrictedCountryValidator.bind(this)]],
      politicallyInfluencedPerson: [false, Validators.required],
      financialObjective: ['', Validators.required]
    });
    this.addAddress(); // Initialize with one address by default
  }
  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }
  addAddress(): void {
    const addressIndex = this.addresses.length;
    const addressGroup = this.fb.group({
      addressLine1: ['',addressIndex===0 ? Validators.required : []],
      addressLine2: ['', addressIndex===0 ? Validators.required : []],
      city: ['', addressIndex===0 ? Validators.required : []],
      state: ['', addressIndex===0 ? Validators.required : []],
      country: ['', addressIndex===0 ? Validators.required : []],
      zipCode: ['', addressIndex===0 ? [Validators.required, Validators.pattern('^[0-9]{5}$')] : []],
      ...(addressIndex == 2 ?
      {internationalAddress: [false, Validators.requiredTrue]}:{}),
      ...(addressIndex == 1 ?
        {internationalAddress: ['']}:{})
    });

    if (addressIndex == 0) {
      addressGroup.get('country')?.setValidators([Validators.required, this.usCountryValidator()]);
      addressGroup.get('country')?.updateValueAndValidity();
    }
    this.addresses.push(addressGroup);
  }
  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }
  // maxAddressesValidator(max: number): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const formArray = control as FormArray;
  //     return formArray.controls.length > max ? { maxAddresses: true } : null;
  //   };
  // }
  usCountryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value !== 'US' ? { nonUsCountryForFirstAddress: true } : null;
  };
}
  usPhoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    if (phoneNumber && !/^\+1\d{10}$/.test(phoneNumber)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }
  landlineNumberValidator(control: AbstractControl): ValidationErrors | null {
    const landlineNumber = control.value;
    if (landlineNumber && !/^\d{8}$/.test(landlineNumber)) {
      return { invalidLandlineNumber: true };
    }
    return null;
  }


  restrictedCountryValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim().toLowerCase();
    if (this.restrictedCountries.some(country => country.toLowerCase() === value)) {
      return { restrictedCountry: true };
    }
    return null;
  }
  onSubmit(): void {
    if(this.form.valid){
      this.customerService.addCustomer(this.form.value).subscribe({
        next: (response) => {
          console.log('Customer added successfully', response);
          this.sharedDataService.setPersonalDetails(this.form.value)
          this.router.navigate(['/register']);
          // Handle successful response
        },
        error: (error) => {
          if (error.status === 500 && error.error.message === "Customer already exists") {
            this.snackBar.open('The customer you are trying to add already exists.', 'Close', {
              duration: 3000,
            });
          } else {
            console.error('Error creating customer:', error);
          }
        },
      });
    }
  }
}

