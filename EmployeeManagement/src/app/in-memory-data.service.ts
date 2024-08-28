import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      {id: 1, name: 'Ram', location: 'Bangalore', email: 'ram@gmail.com', mobile: '9867512345'},
      {id: 2, name: 'Raj', location: 'Chennai', email: 'raj@gmail.com', mobile: '7867534521'},
      {id: 3, name: 'Vinay', location: 'Pune', email: 'vinay@gmail.com', mobile: '9975287450'}
    ];
    return {employees};
  }

  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 11;
  }
}