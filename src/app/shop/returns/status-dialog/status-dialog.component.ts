import {Component, Inject, OnInit} from '@angular/core';
import {ReturnService} from "../../../services/return.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ExpenseRequest, ExpenseType, Return} from "../../../types";
import {ItemService} from "../../../services/item.service";
import {ReportService} from "../../../services/report.service";

export interface DialogData {
  status: string[];
  r: Return;
}

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent {

  showSpinner: boolean;
  error: string;
  shouldShowError: boolean;

  constructor(public dialogRef: MatDialogRef<StatusDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private returnService: ReturnService,
              private itemService: ItemService,
              private reportService: ReportService) {
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit(s: string) {
    this.showSpinner = true;
    this.returnService.updateReturnStatus(s, this.data.r.id)
      .subscribe(res => {
        if (s === 'MONEY_RETURNED') {
          this.data.r.deliveryItems.forEach(deliveryItem => {
            this.itemService.supplyItem(deliveryItem.item.id,
              deliveryItem.quantity).subscribe(() => {
            });
          });
          const expenseRequest: ExpenseRequest = {
            expenseType: ExpenseType.UNEXPECTED,
            amount: this.data.r.value
          };
          this.reportService.addExpense(expenseRequest).subscribe(() => {});
        }
      }, err => {
        this.shouldShowError = true;
        this.error = err.error;
        this.showSpinner = false;
      }, () => {
        this.cancel();
      });
  }
}
