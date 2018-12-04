import {Component, OnInit} from '@angular/core';
import {Delivery} from '../../../types';
import {DeliveryService} from '../../../services/delivery.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemService} from '../../../services/item.service';
import {ReportService} from '../../../services/report.service';
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";
import {ExpenseType} from "../../../globals";

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
              private reportService: ReportService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchDelivery();
  }

  fetchDelivery() {
    this.deliveryService.fetchOneDelivery(this.route.snapshot.params['id']).subscribe(res => {
      this.delivery = res;
    }, err => {
      this.showError(err, true);
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
      this.itemService.supplyItem(deliveryItem.item.id, deliveryItem.quantity)
        .subscribe(() => {});
    });
    const expenseRequest = {
      expenseType: ExpenseType.STOCK,
      amount: this.delivery.value
    };
    this.reportService.addExpense(expenseRequest).subscribe(() => {});
    this.deliveryService.confirmDelivery(this.delivery.id).subscribe(() => {},
      err => this.showError(err, false),
      () => {
        this.isDeliveryLoaded = false;
        this.fetchDelivery();
      });
  }

  showError(err, redirect: boolean) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });

    if (redirect) {
      dialogRef.afterClosed().subscribe(() => this.router.navigate(['/deliveries']));
    }
  }
}
