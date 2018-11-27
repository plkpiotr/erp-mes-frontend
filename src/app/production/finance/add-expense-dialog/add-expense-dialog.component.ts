import { Component, OnInit } from '@angular/core';
import {ExpenseRequest} from "../../../types";
import {MatDialogRef} from "@angular/material";
import {ReportService} from "../../../services/report.service";
import {ExpenseType} from "../../../globals";

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss']
})
export class AddExpenseDialogComponent {

  expenseType: ExpenseType;
  types;
  amount: number;
  error: string;
  shouldShowError: boolean;

  constructor(public dialogRef: MatDialogRef<AddExpenseDialogComponent>,
              private reportService: ReportService) {
    this.types = Object.keys(ExpenseType);
  }

  isFormValid() {
    const regexp = new RegExp('\\d{2}');
    return this.amount != null && regexp.test(this.amount.toString()) && this.expenseType != null;
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    const expenseRequest: ExpenseRequest = {
      expenseType: this.expenseType,
      amount: this.amount
    };

    this.reportService.addExpense(expenseRequest).subscribe(res => {
    }, err => {
      this.shouldShowError = true;
      this.error = err.error;
    }, () => {
      this.cancel();
    });
  }
}
