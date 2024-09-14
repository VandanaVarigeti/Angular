import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/customer/create';
  constructor(private http: HttpClient) { }
  addCustomer(customerData: any): Observable<any> {
    return this.http.post(this.apiUrl, {...customerData, citizenship1: "US"});
  }
}
