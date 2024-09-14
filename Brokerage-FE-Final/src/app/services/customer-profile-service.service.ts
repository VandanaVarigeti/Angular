import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {
  private apiUrl = 'http://localhost:8080/customer/update';
  constructor(private http: HttpClient) { }
  getProfile(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  updateProfile(id: number, profile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, profile);
  }
  }
