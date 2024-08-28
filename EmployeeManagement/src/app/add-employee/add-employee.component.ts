import { Component, OnInit } from '@angular/core';
import {Employee} from "../employee";
import {Title} from "@angular/platform-browser";
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styles:[`label {
   display: inline-block;
   width: 3em;
   margin: .5em 0;
   color: black;
   font-weight: bold;
  
    }`
    
    ]
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee;
  newEmpID: number;
  title: string = 'Add Employee';
  locationList: string[] =  ['Bangalore', 'Chennai', 'Pune', 'Hyderabad'];
  submitted: boolean = false;
  employeeService: EmployeeService;
  employees: Employee[];

  constructor(private titleSer: Title, employeeService: EmployeeService ) {
      this.titleSer.setTitle(this.title);
      this.employeeService = employeeService;
  }


  ngOnInit(): void {
      this.employee = new Employee();
      this.employee.name = '';
      this.employee.location = '';
      this.employee.mobile = '';
      this.employee.email = '';
      this.submitted= false;
      this.employeeService.getEmployees()
          .subscribe(employees => this.employees = employees);
      this.newEmpID = this.getNewID();
  }

  public newEmployee() {
      this.employee.id = this.newEmpID;
      this.employeeService.addEmployee(this.employee as Employee)
          .subscribe(employee => {this.employees.push(employee)});
  }

  public onSubmit() {
      this.submitted = true;
  }

  public getNewID(): number {
  return this.employees.length + 1;
  }
  
}


