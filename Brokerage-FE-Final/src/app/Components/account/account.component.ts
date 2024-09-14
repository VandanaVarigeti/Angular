import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavBarComponent, RouterModule],
  providers: [AccountService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
 
  accountForm !: FormGroup;
  tenantDetailsVisible = false;
  beneficiaryDetailsVisible = false;
  individualVisible= false;
  totalPercentageNot100 = false;
  constructor(private fb: FormBuilder, private accountService: AccountService, private route: Router) { }


  ngOnInit(): void {
    this.accountForm = this.fb.group({
      productType: new FormControl('', [Validators.required]),
      registrationType: new FormControl('', [Validators.required]),
      ssnNumber: new FormControl(''),
      allowedRoles: new FormControl('', Validators.required),
      accountNickName: new FormControl('', [Validators.required]),
      accountAddress: new FormControl('', [Validators.required]),
      accountPhone: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required]),
      accountInvestmentObjective: new FormControl('', [Validators.required]),
      accountAlternateContact: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      jointTenant: this.fb.array([]),
      beneficiaries: this.fb.array([]),
      // ,[this.totalPercentageValidator]
    });
    console.log('initial tenants formArray:', this.tenants);
    this.onChanges()
  }


  onChanges() {
    this.accountForm.get('allowedRoles')?.valueChanges.subscribe(value =>{
      this.individualVisible = value === 'INDIVIDUAL';
      if(this.individualVisible){
        this.beneficiaries.clearValidators();
        this.tenants.clearValidators();
      }
    });
    this.accountForm.get('allowedRoles')?.valueChanges.subscribe(value => {
      this.tenantDetailsVisible = value === 'JT';
      if (this.tenantDetailsVisible) {
        this.addTenantControls();
      } else {
        this.clearTenantControls();
      }
    });
    this.accountForm.get('allowedRoles')?.valueChanges.subscribe(value => {
      this.beneficiaryDetailsVisible = value === 'BENEFICIARY';
      if (this.beneficiaryDetailsVisible) {
        this.addBeneficiaryControls();
        this.beneficiaries.setValidators([Validators.required, this.totalPercentageValidator()]);
      } else {
          this.clearBeneficiaryControls(0);
        // if(this.beneficiaries?.length >0){
          this.beneficiaries.clearValidators();
          
        // }
      }
      this.beneficiaries.updateValueAndValidity();
      
      
    });
  
  }
  get tenants(): FormArray {
    const formArray = this.accountForm.get('jointTenant') as FormArray;
    if(!formArray){
      console.error("Tenants FormArray is not found in the form group");
      return this.fb.array([]);
    }
    return formArray;
   // return this.accountForm.get('join_tenant') as FormArray;
  }
  addTenantControls() {
    const tenantArray = this.tenants;
    while (tenantArray.length < 2) {
      tenantArray.push(this.fb.group({
        ssn: ['', Validators.required],
        tenantName: ['', Validators.required]

      }));
    }
  }
  clearTenantControls() {
    const tenantArray = this.tenants;
   // if(tenantArray){
      tenantArray.clear();
   // }else{
   //   console.error("Tenants FormArray is not initialized.")
  //  }
  }
  get beneficiaries(): FormArray {
    return this.accountForm.get('beneficiaries') as FormArray;
  }
  // addBeneficiaryControls() {
  //   const beneficiariesArray = this.beneficiaries;
  //   while (beneficiariesArray.length < 4) {
  //     beneficiariesArray.push(this.fb.group({
  //       name: ['', Validators.required],
  //       percentage: [[Validators.required]]
  //       //  , Validators.min(1), Validators.max(100)

  //     }));
  //   }
  // }
  addBeneficiaryControls(): void {
    const beneficiariesGroup = this.fb.group({
      name: ['', Validators.required],
      percentage: [Validators.required]
    });
    this.beneficiaries.push(beneficiariesGroup);
  }
  clearBeneficiaryControls(index: number): void {
    this.beneficiaries.removeAt(index);
  
  }
  // clearBeneficiaryControls(index: number): void {
  //   const beneficiariesArray = this.beneficiaries;
  //   // if(beneficiariesArray.length>0){
      

  //   this.beneficiaries.removeAt(index);
      
  //  // }
  // }
    
  
  totalPercentageValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const beneficiaries = formArray.value;
      const totalPercentage = beneficiaries.reduce((total: number, beneficiaries: { percentage: number; }) => total + beneficiaries.percentage, 0);
      return totalPercentage === 100 ? null : { percentageError: 'Total percentage must be 100' };
    };



  }

  get accountNickName() {
    return this.accountForm.get('accountNickName');
  }
  get accountaddress() {
    return this.accountForm.get('accountAddress');
  }
  get accountemail() {
    return this.accountForm.get('emailAddress');
  }
  get accountinvestmentobjective() {
    return this.accountForm.get('accountInvestmentObjective');
  }
  get accountphone() {
    return this.accountForm.get('accountPhone');
  }
  get accountalternatecontact() {
    return this.accountForm.get('accountAlternateContact');
  }
  get ssnNumber(){
    return this.accountForm.get('ssnNumber');
  }

  onSubmit(): void {
    if (this.accountForm.valid) {

      this.accountService.addData(this.accountForm.value).subscribe(
        response => {
          console.log("Account Saved Successfully", response);
          alert("Account Created Successfully");
          this.route.navigate(['/dashboard']);
          this.accountForm.reset();
        },
      error => {
        alert("Error Saving Account");
        console.error("Error Saving Account Data", error);
      }
      );
      
      }
      else{
        console.error("Form is Invalid");
    }

  }
  // onSubmit(): void{
  //   console.log(this.accountForm.value);
    
  // }



}

