import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: String,
  content: String,
  positiveAction: Function,
  negativeAction: Function
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  title: String;
  content: String;
  positiveAction: Function;
  negativeAction: Function;

  constructor(@Inject(MAT_DIALOG_DATA) data: DialogData) {
    this.title = data.title;
    this.content = data.content;
    this.positiveAction = data.positiveAction
    this.negativeAction = data.negativeAction
  }
}
