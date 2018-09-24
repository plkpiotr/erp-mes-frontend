import {Component, OnInit} from '@angular/core';
import {Complaint, ComplaintStatus, ExpenseRequest, ExpenseType, Resolution} from '../../../types';
import {ComplaintService} from '../../../services/complaint.service';
import {ItemService} from '../../../services/item.service';
import {ReportService} from '../../../services/report.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  isComplaintLoaded = false;
  complaint: Complaint;
  unresolvedStatuses = ['IN_PROGRESS', 'ACCEPTED', 'DECLINED', 'DECLINED_ITEM_SENT'];
  resolvedStatuses = ['MONEY_RETURNED', 'NEW_ITEM_SENT', 'REPAIRING_ITEM', 'REPAIRED_ITEM_SENT'];
  statuses;
  resolutions;
  status: ComplaintStatus;
  resolution: Resolution;

  constructor(private complaintService: ComplaintService, private itemService: ItemService,
              private reportService: ReportService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchComplaint();
    this.resolutions = Object.keys(Resolution);
  }

  fetchComplaint() {
    this.complaintService.fetchOneComplaint(this.route.snapshot.params['id']).subscribe(res => {
      this.complaint = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isComplaintLoaded = true;
      this.status = this.complaint.status;
      this.resolution = this.complaint.resolution;
      if (this.complaint.resolution === Resolution.UNRESOLVED) {
        this.statuses = this.unresolvedStatuses;
      } else {
        this.statuses = this.resolvedStatuses;
      }
    });
  }

  updateComplaintStatus() {
    this.isComplaintLoaded = false;
    this.complaintService.updateComplaintStatus(this.status.toLocaleString(), this.route.snapshot.params['id'])
      .subscribe(res => {
        this.complaint = res;
      }, err => {
        console.log(err);
      }, () => {
        if (this.complaint.status === ComplaintStatus.MONEY_RETURNED) {
          const expenseRequest: ExpenseRequest = {
            expenseType: ExpenseType.UNEXPECTED,
            amount: this.complaint.value
          };
          this.reportService.addExpense(expenseRequest).subscribe(res => {
          });
        } else if (this.complaint.status === ComplaintStatus.NEW_ITEM_SENT) {
          this.complaint.deliveryItems.forEach(deliveryItem => {
            this.itemService.buyItem(deliveryItem.item.id, deliveryItem.quantity).subscribe(res => {
            });
          });
        }
        this.isComplaintLoaded = true;
      });
  }

  updateComplaintResolution() {
    this.isComplaintLoaded = false;
    this.complaintService.updateComplaintResolution(this.resolution.toLocaleString(),
      this.route.snapshot.params['id']).subscribe(res => {
      this.complaint = res;
    }, err => {
      console.log(err);
    }, () => {
      if (this.complaint.resolution === Resolution.UNRESOLVED) {
        this.statuses = this.unresolvedStatuses;
      } else {
        this.statuses = this.resolvedStatuses;
      }
      this.isComplaintLoaded = true;
    });
  }

}
