import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { EmployeeModel } from 'src/app/models/employee-model';
import { EmployeeService } from 'src/app/services/employee-service';
import { StringFormat } from 'src/app/utils/StringFormat';
import { Messages } from 'src/messages';

export enum FORM_ACTIONS {
  CREATE = "Cadastrar",
  EDIT = "Editar"
}

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})


export class AdminAreaComponent {

  employees: EmployeeModel[];
  employee: EmployeeModel;
  displayedColumns: String[]; 
  formAction: String;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.employees = [];
    this.employee = new EmployeeModel();
    this.displayedColumns = ['id', 'firstName', 'lastName', 'cellphone', 'email', 'edit', 'delete'];
    this.formAction = FORM_ACTIONS.CREATE;
    this.getEmployees();
  }
  
  getEmployees() : void {
    this.employeeService.getAll().subscribe(res => {
      this.employees = res;
    });
  }

  createEmployee() : void {
    this.employeeService.create(this.employee).subscribe(_ => {
      this.getEmployees();
      this.showSnackBar(Messages.createdSuccessfully);
    });
  }

  prepareFormForUpdate(employee: EmployeeModel) : void {
    this.employee = structuredClone(employee);
    this.formAction = FORM_ACTIONS.EDIT;
  }

  updateEmployee() : void {
    this.employeeService.update(this.employee.id as number, this.employee).subscribe(_ => {
      this.getEmployees();
      this.showSnackBar(Messages.updatedSuccessfully);
    });
  }

  deleteEmployee(id: number) : void {
    this.employeeService.delete(id).subscribe(_ => {
      this.getEmployees();
      this.showSnackBar(Messages.deletedSuccessfully);
    })
  }

  openDeleteDialog(id: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { 
        title: StringFormat(Messages.warningDeleteEmployee, id.toString()),
        content: Messages.warningThisActionCannotBeUndone,
        positiveAction: () => { this.deleteEmployee(id) },
        negativeAction: () => { }
      }
    });
  }

  performFormAction() : void {
    if(this.formAction === FORM_ACTIONS.CREATE){
      this.createEmployee();
    }
    else{
      this.updateEmployee();
      this.formAction = FORM_ACTIONS.CREATE;
    }
    this.cleanForm();
  }

  cleanForm() : void {
    this.employee = new EmployeeModel();
    this.formAction = FORM_ACTIONS.CREATE;
  }

  showSnackBar(text: String): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2 * 1000,
      data: {
        text: text
      }
    });
  }
}
