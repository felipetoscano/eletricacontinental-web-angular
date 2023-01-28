import { Component } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee-service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})

export class AdminAreaComponent {

  employees: EmployeeModel[];
  employee: EmployeeModel;

  displayedColumns: String[] = ['id', 'firstName', 'lastName', 'cellphone', 'email', 'edit', 'delete']

  formAction: String;

  constructor(private employeeService: EmployeeService) {
    this.employees = [];
    this.employee = new EmployeeModel();
    this.formAction = "Cadastrar";
    this.getEmployees();
  }
  
  getEmployees() : void {
    this.employeeService.getAll().subscribe(res => {
      this.employees = res;
    });
  }

  createEmployee() : void {
    this.employeeService.create(this.employee).subscribe(res => {
      this.getEmployees();
    });
  }

  updateEmployee() : void {
    this.employeeService.update(this.employee.id as number, this.employee).subscribe(res => {
      this.getEmployees();
    });
  }

  deleteEmployee(id: number) : void {
    this.employeeService.delete(id).subscribe(res => {
      this.getEmployees();
    })
  }

  prepareFormForUpdate(employee: EmployeeModel) : void {
    this.employee = employee;
    this.formAction = "Editar";
  }

  performFormAction() : void {
    if(this.formAction === 'Cadastrar'){
      this.createEmployee();
    }
    else{
      this.updateEmployee();
      this.formAction = "Cadastrar";
    }
    this.employee = new EmployeeModel();
  }
}
