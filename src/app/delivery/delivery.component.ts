import { Component, OnInit } from '@angular/core';
import {Delivery, ExpenseType} from "../types";
import {DeliveryService} from "../delivery.service";
import {ActivatedRoute} from "@angular/router";
import {ItemService} from "../item.service";
import {ReportService} from "../report.service";
import {_appIdRandomProviderFactory} from "@angular/core/src/application_tokens";

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  isDeliveryLoaded = false;
  delivery: Delivery;
  isConfirmed = false;

  constructor(private deliveryService: DeliveryService,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private reportService: ReportService) { }

  ngOnInit() {
    this.fetchDelivery();
  }

  fetchDelivery() {
    this.deliveryService.fetchOneDelivery(this.route.snapshot.params['id']).subscribe(res => {
      this.delivery = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isDeliveryLoaded = true;
    });
  }

  canConfirmDelivery(): boolean {
    const today = new Date();
    const deliveryDate = new Date(this.delivery.scheduledFor);
    const isPastDate =  deliveryDate.valueOf() - today.valueOf() <= 0;
    return isPastDate && !this.isConfirmed;
  }

  confirmDelivery() {
    this.delivery.deliveryItems.forEach(deliveryItem => {
      this.itemService.supplyItem(deliveryItem.item.id, deliveryItem.quantity).subscribe(res => {});
    });
    const expenseRequest = {
      expenseType: ExpenseType.STOCK,
      amount: this.delivery.value
    };
    this.reportService.addExpense(expenseRequest).subscribe(res => {});
    this.isConfirmed = true;
  }
}
