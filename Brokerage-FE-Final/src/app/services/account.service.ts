import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8080/product';
  constructor(private http: HttpClient) { }

  addData(accountData : any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addproduct`, accountData);
  }
}

