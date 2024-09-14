import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../Components/register/register.module';
//import { Register } from '../Components/register/register.module';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'http://localhost:8080/register';
  

  constructor(private http: HttpClient) {}

  registerCustomer(register: Register): Observable<Register> {
    return this.http.post<Register>(`${this.baseUrl}/newregister`, register);
  }

}
