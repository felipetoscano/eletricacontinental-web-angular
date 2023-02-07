import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
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
  form = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    cellphone: new FormControl(''),
    email: new FormControl('')
  })
  saving: Boolean;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.employees = [];
    this.employee = new EmployeeModel();
    this.displayedColumns = ['id', 'firstName', 'lastName', 'cellphone', 'email', 'edit', 'delete'];
    this.formAction = FORM_ACTIONS.CREATE;
    this.getEmployees();
    this.form.controls.id.disable();
    this.saving = false;
  }
  
  getEmployees() : void {
    this.employeeService.getAll().subscribe(res => {
      this.employees = res;
    });
  }

  createEmployee() : void {
    this.saving = true;
    this.employeeService.create(this.employee).subscribe({
      complete: () => {
        this.getEmployees();
        this.showSnackBar(Messages.createdSuccessfully);
        this.saving = false;
      },
      error: (err) => this.handleFormControlErrors(err)
    });
  }

  prepareFormForUpdate(employee: EmployeeModel) : void {
    this.employee = structuredClone(employee);
    this.formAction = FORM_ACTIONS.EDIT;
  }

  updateEmployee() : void {
    this.saving = true;
    this.employeeService.update(this.employee.id as number, this.employee).subscribe({
      complete: () => {
        this.getEmployees();
        this.showSnackBar(Messages.updatedSuccessfully);
        this.saving = false;
      },
      error: (err) => this.handleFormControlErrors(err)
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
    this.form.reset();
  }

  showSnackBar(text: String): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2 * 1000,
      data: {
        text: text
      }
    });
  }

  getError(formControlName: string) : String {
    return this.form.get(formControlName)?.errors?.['serverError'];
  }

  handleFormControlErrors(err: any) : void {
    this.saving = false;
    if(err instanceof HttpErrorResponse){
      if(err.status === 400){
        const errorMessages = err.error.errorDetail;
        Object.keys(errorMessages).forEach(prop => {
          const formControl = this.form.get(prop);
          if(formControl){
            formControl.setErrors({
              serverError: errorMessages[prop]
            });
          }
        })
      }
    }
  }
}
