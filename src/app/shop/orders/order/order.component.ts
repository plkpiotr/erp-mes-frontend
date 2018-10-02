import {Component, OnInit} from '@angular/core';
import {Order, Status} from '../../../types';
import {OrderService} from '../../../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {OrderStatusDialogComponent} from "../order-status-dialog/order-status-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  isOrderLoaded = false;
  order: Order;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchOrder();
  }

  fetchOrder() {
    this.orderService.fetchOneOrder(this.route.snapshot.params['id']).subscribe(res => {
      this.order = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isOrderLoaded = true;
    });
  }

  updateOrderStatus() {
    let status = [];
    if (this.order.status === Status.WAITING_FOR_PAYMENT) {
      status = ['IN_PROGRESS', 'DECLINED'];
    } else if (this.order.status === Status.IN_PROGRESS) {
      status = ['SENT', 'DECLINED'];
    }
    const dialogRef = this.dialog.open(OrderStatusDialogComponent, {
      width: '350px',
      data: {
        status: status,
        order: this.order
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOrderLoaded = false;
      this.fetchOrder();
    });
  }
}
