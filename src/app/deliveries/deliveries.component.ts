import { Component, OnInit } from '@angular/core';
import {DeliveryService} from "../delivery.service";
import {Router} from "@angular/router";
import {Delivery} from "../types";

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  areDeliveriesLoaded = false;
  deliveries: Delivery[];

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
    });
  }

  seeDelivery(id: number) {
    this.router.navigate(['/deliveries', id]);
  }

  addDelivery() {
    this.router.navigate(['deliveries/add']);
  }

}
