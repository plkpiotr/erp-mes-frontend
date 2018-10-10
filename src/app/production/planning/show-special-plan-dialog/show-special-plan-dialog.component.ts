import {Component, Inject, OnInit} from '@angular/core';
import {SpecialPlan} from "../../../types";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface DialogData {
  specialPlan: SpecialPlan;
}

@Component({
  selector: 'app-show-special-plan-dialog',
  templateUrl: './show-special-plan-dialog.component.html',
  styleUrls: ['./show-special-plan-dialog.component.scss']
})
export class ShowSpecialPlanDialogComponent {

  constructor(public dialogRef: MatDialogRef<ShowSpecialPlanDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
