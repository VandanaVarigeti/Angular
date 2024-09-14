import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth/login'; // Replace with your backend URL
    constructor(private http: HttpClient) {}
    login(credentials: { userName: string; password: string }): Observable<boolean> {
      return this.http.post(this.apiUrl, credentials, { withCredentials: true }).pipe(
        map((response: any) => {
          return true;  // Assume success if no error is thrown
        }),
        catchError((error: any) => {
          console.error('Login error:', error);
          return of(false);
        })
      );
    }
  }
