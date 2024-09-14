import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthGuard } from '../../services/auth.guard';
import { AuthInterceptor } from '../../services/auth.intercepter';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,RouterModule, MatButtonModule,MatToolbarModule],
  providers: [LoginService, AuthGuard,[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  public loggedIn = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
  }

  logoutUser() {
    this.loginService.logout();
    this.router.navigate(['/login']);
   // window.location.reload();
    //location.reload();
  }
}
