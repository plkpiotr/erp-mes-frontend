import {Component, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../../types';
import {OrderService} from '../../../services/order.service';
import {Router} from '@angular/router';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Array<Order>;
  areOrdersLoaded = false;
  dataSource: MatTableDataSource<Order> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private orderService: OrderService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.fetchAllOrders().subscribe(res => {
      this.orders = res;
    }, err => {
      this.showError(err);
    }, () => {
      this.areOrdersLoaded = true;
      this.dataSource = new MatTableDataSource<Order>(this.orders);
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

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/employees']));
  }
}
