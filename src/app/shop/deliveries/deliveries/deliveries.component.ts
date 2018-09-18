import { Component, OnInit } from '@angular/core';
import {DeliveryService} from '../../../services/delivery.service';
import {Router} from '@angular/router';
import {Delivery} from '../../../types';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  areDeliveriesLoaded = false;
  deliveries: Array<Delivery>;
  visibleDeliveries: Array<Delivery>;

  deliveriesPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

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
      this.setVisibleDeliveries();
      this.setPageNumbers();
    });
  }

  seeDelivery(id: number) {
    this.router.navigate(['/deliveries', id]);
  }

  addDelivery() {
    this.router.navigate(['deliveries/add']);
  }

  setVisibleDeliveries() {
    const pageIndex = (this.selectedPage - 1) * this.deliveriesPerPage;
    this.visibleDeliveries = this.deliveries.slice(
      pageIndex,
      pageIndex + this.deliveriesPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.deliveries.length / this.deliveriesPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisibleDeliveries();
  }

}
