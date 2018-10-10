import {Component, Inject} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ItemService} from "../../../services/item.service";
import {ReportService} from "../../../services/report.service";
import {Order} from "../../../types";

export interface DialogData {
  status: string[];
  order: Order;
}

@Component({
  selector: 'app-order-status-dialog',
  templateUrl: './order-status-dialog.component.html',
  styleUrls: ['./order-status-dialog.component.scss']
})
export class OrderStatusDialogComponent {

  showSpinner: boolean;
  error: string;
  shouldShowError: boolean;

  constructor(public dialogRef: MatDialogRef<OrderStatusDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private orderService: OrderService,
              private itemService: ItemService,
              private reportService: ReportService) {
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit(s: string) {
    this.showSpinner = true;
    this.orderService.updateOrderStatus(s, this.data.order.id)
      .subscribe(res => {
        if (s === 'SENT') {
          const expenseRequest = {
            amount: this.data.order.value
          };
          this.reportService.addIncome(expenseRequest.amount).subscribe(res => {});
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
