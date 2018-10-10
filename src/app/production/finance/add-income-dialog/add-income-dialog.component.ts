import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {ReportService} from "../../../services/report.service";

@Component({
  selector: 'app-add-income-dialog',
  templateUrl: './add-income-dialog.component.html',
  styleUrls: ['./add-income-dialog.component.scss']
})
export class AddIncomeDialogComponent {

  income = 0;
  error: string;
  shouldShowError: boolean;

  constructor(public dialogRef: MatDialogRef<AddIncomeDialogComponent>,
              private reportService: ReportService) {}

  isFormValid() {
    const regexp = new RegExp('\\d{2}');
    return this.income != null && regexp.test(this.income.toString());
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    this.reportService.addIncome(this.income).subscribe(res => {
    }, err => {
      this.shouldShowError = true;
      this.error = err.error;
    }, () => {
      this.cancel();
    });
  }

}
