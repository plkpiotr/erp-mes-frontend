import {Component, OnInit} from '@angular/core';
import {ExpenseRequest, ExpenseType, Return, ReturnStatus} from '../../../types';
import {ReturnService} from '../../../services/return.service';
import {ItemService} from '../../../services/item.service';
import {ReportService} from '../../../services/report.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  isReturnLoaded = false;
  return: Return;
  statuses;
  status: ReturnStatus;

  constructor(private returnService: ReturnService, private itemService: ItemService,
              private reportService: ReportService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchReturn();
    this.statuses = Object.keys(ReturnStatus);
  }

  fetchReturn() {
    this.returnService.fetchOneReturn(this.route.snapshot.params['id']).subscribe(res => {
      this.return = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isReturnLoaded = true;
      this.status = this.return.status;
    });
  }

  updateReturnStatus() {
    this.isReturnLoaded = false;
    this.returnService.updateReturnStatus(this.status.toLocaleString(), this.route.snapshot.params['id'])
      .subscribe(res => {
        this.return = res;
      }, err => {
        console.log(err)
      }, () => {
        if (this.return.status === ReturnStatus.MONEY_RETURNED) {
          this.return.deliveryItems.forEach(deliveryItem => {
            this.itemService.supplyItem(deliveryItem.item.id, deliveryItem.quantity).subscribe(res => {
            });
          });
          const expenseRequest: ExpenseRequest = {
            expenseType: ExpenseType.UNEXPECTED,
            amount: this.return.value
          };
          this.reportService.addExpense(expenseRequest).subscribe(res => {
          });
        }
        this.isReturnLoaded = true;
      });
  }
}
