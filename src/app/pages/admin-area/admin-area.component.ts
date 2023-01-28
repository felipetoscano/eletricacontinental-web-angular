import { Component } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee-service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})

export class AdminAreaComponent {

  employees: EmployeeModel[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'cellphone', 'email']

  constructor(private employeeService: EmployeeService) {
    this.getEmployees();
  }
  
  getEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res;
    });
  }
}
