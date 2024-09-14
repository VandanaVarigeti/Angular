import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule,CommonModule,MatToolbarModule,MatFormFieldModule,MatInputModule, FormsModule,NavBarComponent],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: '',
  };
  invalidLogin = false;
  attempts = 0;

  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {}
  onSubmit() {
    console.log('form is submitted');
    if (
      this.credentials.username != '' &&
      this.credentials.password != '' &&
      this.credentials.username.trim() != '' &&
      this.credentials.password.trim() != ''
    ) {
      console.log(this.credentials.username);
      console.log('We have to submit the form');
      //token generate
      this.loginService.generateToken(this.credentials).subscribe(
        (response: any) => {
          //success
          //console.log(response.token);
          console.log(response);

          this.loginService.loginUser(response.token);
          //window.location.href = '/dashboard';
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          //error
          console.log(error);
          this.invalidLogin = true;
          this.attempts++;
 
          if (this.attempts >= 3) {
            alert(
              'Your account has been locked for more than 3 incorrect attempts. Please reset your password to log in again.'
            );
            this.router.navigate(['/forgot-password']);
          }
        }
      );
    } else {
      console.log('fields are empty');
    }
  }

  OnForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
