import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dropdownVisible: boolean = false;
  constructor(private router: Router,private loginService:LoginService) {}

  hideTimeout: any;

  showDropdown() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    this.dropdownVisible = true;
  }

  hideDropdown() {
    this.hideTimeout = setTimeout(() => {
      this.dropdownVisible = false;
    }, 500); // Adjust the delay as needed
  }
 // Method to handle profile update click
  onUpdateProfile(): void{
    this.router.navigate(['/update'])
   // Add logic for updating profile
    console.log('Update Profile clicked');
   this.hideDropdown();  // Close dropdown after click
    
  }
  
  goToProduct(): void{
    this.router.navigate(['/account']);
  }
  onLogout() {
    console.log('Logout clicked');
    this.loginService.logout();
    this.router.navigate(['/login']);
   this.hideDropdown();  
   // Close dropdown after click
  }


}
