import { Component, OnInit } from '@angular/core';
import {ExpenseType, Order} from '../../../types';
import {OrderService} from '../../../services/order.service';
import {ItemService} from '../../../services/item.service';
import {ReportService} from '../../../services/report.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  isOrderLoaded = false;
  order: Order;

  constructor(private orderService: OrderService, private itemService: ItemService, private reportService: ReportService,
              private route: ActivatedRoute) { }

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

  confirmOrder() {
    this.order.deliveryItems.forEach(deliveryItem => {
      this.itemService.buyItem(deliveryItem.item.id, deliveryItem.quantity).subscribe(res => {});
    });
    const expenseRequest = {
      amount: this.order.value
    };
    this.reportService.addIncome(expenseRequest.amount).subscribe(res => {});
  }
}
