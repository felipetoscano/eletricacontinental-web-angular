import { Component, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface SnackBarData {
  text: String
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {

  text: String;

  constructor(public snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) data: SnackBarData) {
    this.text = data.text
  }

}
