import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface DialogData {
  percentOff: string;
  query: string;
}

@Component({
  selector: 'app-special-offer-dialog',
  templateUrl: './special-offer-dialog.component.html',
  styleUrls: ['./special-offer-dialog.component.scss']
})
export class SpecialOfferDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SpecialOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  isFormValid() {
    const regexp = new RegExp('\\d{2}');
    return regexp.test(this.data.percentOff);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    this.dialogRef.close(this.data);
  }

}
