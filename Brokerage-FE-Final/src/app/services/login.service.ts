import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:8080/login';
  constructor(private http: HttpClient) {}

  //calling the server to generate token
  generateToken(credentials: any) {
    //generate token
    return this.http.post(`${this.url}/token`, credentials);
  }

  loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }
  //check user login or not
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      return token !== undefined && token !== '' && token !== null;
    }
    return false; // Return false if localStorage is not available
  }

  //logout user
  logout() {
    localStorage.removeItem('token');
    return true;
  }
  //getting token
  getToken() {
    return localStorage.getItem('token');
  }
  // resetPassword(username: string) {
  //   return this.http.post(`${this.url}/request-password-reset`, { username });
  // }
  // changePassword(username: string, newPassword: string) {
  //   return this.http.post(`${this.url}/change-password`, {
  //     username,
  //     newPassword,
  //   });
  // }
  changePassword(credentials: any) {
    return this.http.post(`${this.url}/change-password`, credentials, {responseType: 'text'});
  }
}
