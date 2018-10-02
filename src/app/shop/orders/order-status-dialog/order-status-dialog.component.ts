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
    //TODO: uncomment
    // this.orderService.updateOrderStatus(s, this.data.order.id)
    //   .subscribe(res => {
    //   }, err => {
    //     console.log(err);
    //   }, () => {
    //     if (s === 'SENT') {
    //       this.data.order.deliveryItems.forEach(deliveryItem => {
    //         this.itemService.buyItem(deliveryItem.item.id, deliveryItem.quantity).subscribe(res => {});
    //       });
    //       const expenseRequest = {
    //         amount: this.data.order.value
    //       };
    //       this.reportService.addIncome(expenseRequest.amount).subscribe(res => {});
    //     }
    //     this.cancel();
    //   });
  }

}
