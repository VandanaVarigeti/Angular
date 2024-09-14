import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { SharedDataService } from '../../services/shared-data.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Register } from './register.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule,FormsModule, NavBarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
[x: string]: any;
  registerForm!: FormGroup;
  form!: FormGroup;
  isReadOnly = true;

  constructor(private fb: FormBuilder,private registerService: RegisterService,private router: Router, private sharedDataService: SharedDataService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      lastName: ['',[Validators.required,Validators.pattern('^[A-Za-z]+$')]],
      emailAddress: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  
    // this.form = this.fb.group({
    //   selectedQuestion: ['', Validators.required],
    //   answer: ['', Validators.required]
    // });

    const customerData = this.sharedDataService.getPersonalDetails();
      if(customerData){
        this.registerForm.patchValue({
          emailAddress: customerData.emailAddress,
          firstName: customerData.firstName,
          lastName: customerData.lastName

        });
      }
  }

  securityQuestions = [
    'What is your favorite color?',
    'What is your pet\'s name?',
    'What is your mother\'s maiden name?'
  ];
  

  // passwordValidator(control: any) {
  //   const password = control.value;
  //   const hasNumber = /\d/.test(password);
  //   const hasAlphabet = /[a-zA-Z]/.test(password);
  //   const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  //   const valid = hasNumber && hasAlphabet && hasSpecial && password.length >= 8;
  //   return valid ? null : { invalidPassword: true };
  // }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const register: Register = this.registerForm.value;
      this.registerService.registerCustomer(register).subscribe(
        response => {
          console.log('Customer saved successfully', response);
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Error saving customer', error);
        }
      );
     } else {
       console.log('Form is invalid');
    }
    }
  }
