import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Employee } from './employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private employeesURL = 'api/employees';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesURL);
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesURL}/${id}`;
    return this.http.get<Employee>(url);
  }
  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesURL}/?name=${term}`);
  }

  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesURL, employee, this.httpOptions);
  }

  deleteEmployee (employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesURL}/${id}`;

    return this.http.delete<Employee>(url, this.httpOptions);
  }

  updateEmployee (employee: Employee): Observable<any> {
    return this.http.put(this.employeesURL, employee, this.httpOptions);
  }

}
