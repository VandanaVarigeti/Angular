import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  title = 'Employee List';
  public searchText:string;

  constructor(private employeeService: EmployeeService, private titleSer: Title) {
    titleSer.setTitle(this.title);

  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
    .subscribe(employees => this.employees = employees);
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }


}
