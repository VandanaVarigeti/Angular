import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: 'detail/:id', component: EmployeeDetailsComponent },
  { path: 'employeeList', component: EmployeesComponent },
  { path: 'editEmployee/:id', component: EditEmployeeComponent},
  { path: 'addEmployee', component: AddEmployeeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
