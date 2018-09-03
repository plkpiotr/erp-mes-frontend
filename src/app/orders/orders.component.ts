import {Component, OnInit} from '@angular/core';
import {Order} from '../types';
import {OrderService} from '../order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<Order>;
  areOrdersLoaded = false;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.fetchAllOrders().subscribe(res => {
      this.orders = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areOrdersLoaded = true;
    });
  }

  seeOrder(id: number) {
    this.router.navigate(['/orders', id]);
  }

  addOrder() {
    this.router.navigate(['orders/add']);
  }
}
