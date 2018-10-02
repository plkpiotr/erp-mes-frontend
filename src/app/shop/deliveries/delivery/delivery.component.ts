import {Component, OnInit} from '@angular/core';
import {Delivery, ExpenseType} from '../../../types';
import {DeliveryService} from '../../../services/delivery.service';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../../../services/item.service';
import {ReportService} from '../../../services/report.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  isDeliveryLoaded = false;
  delivery: Delivery;

  constructor(private deliveryService: DeliveryService,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private reportService: ReportService) {
  }

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
    const isPastDate = deliveryDate.valueOf() - today.valueOf() <= 0;
    return isPastDate && !this.delivery.confirmed;
  }

  confirmDelivery() {
    this.delivery.deliveryItems.forEach(deliveryItem => {
      this.itemService.supplyItem(deliveryItem.item.id, deliveryItem.quantity).subscribe(res => {
      });
    });
    const expenseRequest = {
      expenseType: ExpenseType.STOCK,
      amount: this.delivery.value
    };
    this.reportService.addExpense(expenseRequest).subscribe(res => {
    });
    this.deliveryService.confirmDelivery(this.delivery.id).subscribe(res => {
      },
      err => console.log(err),
      () => {
        this.isDeliveryLoaded = false;
        this.fetchDelivery();
      });
  }
}
