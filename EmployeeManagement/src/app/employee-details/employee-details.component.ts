import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})

  export class EmployeeDetailsComponent implements OnInit {
    @Input() employee: Employee;
  
    constructor(
      private route: ActivatedRoute,
      private employeeService: EmployeeService,
      private location: Location,
      private titleSer: Title
    ) {
      this.titleSer.setTitle('Employee Details')
    }
  
    ngOnInit(): void {
      this.getEmployee();
    }
  
    getEmployee(): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.employeeService.getEmployee(id)
        .subscribe(empl => this.employee = empl);
    }
  
    goBack(): void {
      this.location.back();
    }
  }
  


