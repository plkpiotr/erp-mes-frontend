import {Component, OnInit} from '@angular/core';
import {Order} from '../../../types';
import {OrderService} from '../../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Array<Order>;
  visibleOrders: Array<Order>;
  areOrdersLoaded = false;

  ordersPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

  constructor(private orderService: OrderService, private router: Router) {
  }

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
      this.setVisibleOrders();
      this.setPageNumbers();
    });
  }

  seeOrder(id: number) {
    this.router.navigate(['/orders', id]);
  }

  addOrder() {
    this.router.navigate(['shop-service/add'], {
      queryParams: {
        service: 'order'
      }
    });
  }

  setVisibleOrders() {
    const pageIndex = (this.selectedPage - 1) * this.ordersPerPage;
    this.visibleOrders = this.orders.slice(
      pageIndex,
      pageIndex + this.ordersPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.orders.length / this.ordersPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisibleOrders();
  }
}
