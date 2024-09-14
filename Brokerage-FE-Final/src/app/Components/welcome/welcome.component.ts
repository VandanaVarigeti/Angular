import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  constructor(private router: Router) {}
  navigateTo(page: string) {
    if (page === 'login') {
      this.router.navigate(['/login']);
    } else if (page === 'signup') {
      this.router.navigate(['/customer']);
    }
  }
}
