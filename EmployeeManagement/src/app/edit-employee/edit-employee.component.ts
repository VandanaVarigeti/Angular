import { Component, OnInit } from '@angular/core';
import {Employee} from "../employee";
import {Title} from "@angular/platform-browser";
import { EmployeeService } from '../employee.service';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styles:[`label {
    display: inline-block;
    width: 3em;
    margin: .5em 0;
    color: black;
    font-weight: bold;
}`
]
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee;
  title: string = 'Edit Employee';
  locationList: string[] =  ['Bangalore', 'Chennai', 'Pune', 'Hyderabad'];
  submitted: boolean = false;
  employeeService: EmployeeService;
  employees: Employee[];

  constructor(private titleSer: Title, employeeService: EmployeeService, private route: ActivatedRoute) {
      this.titleSer.setTitle(this.title);
      this.employeeService = employeeService;
  }


  ngOnInit(): void {
      this.submitted= false;
      this.getEmployee();
      this.employeeService.getEmployees()
          .subscribe(employees => this.employees = employees);
  }

  getEmployee(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.employeeService.getEmployee(id)
          .subscribe(empl => this.employee = empl);
  }

  public updateEmployee() {
      this.employeeService.updateEmployee(this.employee as Employee)
          .subscribe(employee => {this.employees.push(employee)});
  }

  public onSubmit() {
      this.submitted = true;
  }

}

