import {Component, OnInit, ViewChild} from '@angular/core';
import {DeliveryService} from '../../../services/delivery.service';
import {Router} from '@angular/router';
import {Delivery} from '../../../types';
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  areDeliveriesLoaded = false;
  deliveries: Array<Delivery>;
  dataSource: MatTableDataSource<Delivery> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private deliveryService: DeliveryService,
              private router: Router) { }

  ngOnInit() {
    this.fetchDeliveries();
  }

  fetchDeliveries() {
    this.deliveryService.fetchAllDeliveries().subscribe(res => {
      this.deliveries = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areDeliveriesLoaded = true;
      this.dataSource = new MatTableDataSource<Delivery>(this.deliveries);
    });
  }

  seeDelivery(id: number) {
    this.router.navigate(['/deliveries', id]);
  }

  addDelivery() {
    this.router.navigate(['deliveries/add']);
  }
}
