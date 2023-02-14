import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { CustomerModel } from 'src/app/models/customer-model';
import { CustomerService } from 'src/app/services/customer-service';
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

  customers: CustomerModel[];
  customer: CustomerModel;
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

  constructor(private customerService: CustomerService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.customers = [];
    this.customer = new CustomerModel();
    this.displayedColumns = ['id', 'firstName', 'lastName', 'cellphone', 'email', 'edit', 'delete'];
    this.formAction = FORM_ACTIONS.CREATE;
    this.getCustomers();
    this.form.controls.id.disable();
    this.saving = false;
  }
  
  getCustomers() : void {
    this.customerService.getAll().subscribe(res => {
      this.customers = res;
    });
  }

  createCustomer() : void {
    this.saving = true;
    this.customerService.create(this.customer).subscribe({
      complete: () => {
        this.getCustomers();
        this.showSnackBar(Messages.createdSuccessfully);
        this.saving = false;
      },
      error: (err) => this.handleFormControlErrors(err)
    });
  }

  prepareFormForUpdate(customer: CustomerModel) : void {
    this.customer = structuredClone(customer);
    this.formAction = FORM_ACTIONS.EDIT;
  }

  updateCustomer() : void {
    this.saving = true;
    this.customerService.update(this.customer.id as number, this.customer).subscribe({
      complete: () => {
        this.getCustomers();
        this.showSnackBar(Messages.updatedSuccessfully);
        this.saving = false;
      },
      error: (err) => this.handleFormControlErrors(err)
    });
  }

  deleteCustomer(id: number) : void {
    this.customerService.delete(id).subscribe(_ => {
      this.getCustomers();
      this.showSnackBar(Messages.deletedSuccessfully);
    })
  }

  openDeleteDialog(id: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { 
        title: StringFormat(Messages.warningDeleteCustomer, id.toString()),
        content: Messages.warningThisActionCannotBeUndone,
        positiveAction: () => { this.deleteCustomer(id) },
        negativeAction: () => { }
      }
    });
  }

  performFormAction() : void {
    if(this.formAction === FORM_ACTIONS.CREATE){
      this.createCustomer();
    }
    else{
      this.updateCustomer();
      this.formAction = FORM_ACTIONS.CREATE;
    }
    this.cleanForm();
  }

  cleanForm() : void {
    this.customer = new CustomerModel();
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
