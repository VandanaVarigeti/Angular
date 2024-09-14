import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, NavBarComponent],
  providers: [LoginService],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  credentials = {
    username: '',
    newPassword: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    console.log('Forgot Password form is submitted');
    if (
      this.credentials.username &&
      this.credentials.newPassword &&
      this.credentials.username.trim() !== '' &&
      this.credentials.newPassword.trim() !== ''
    ) {
      console.log('Sending password change request');
      this.loginService.changePassword(this.credentials).subscribe(
        (response: any) => {
          console.log('Password changed successfully', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('Error during password change', error);
        }
      );
    } else {
      console.log('Fields are empty');
    }
  }
}
