import {Component, OnInit} from '@angular/core';
import {Complaint, ExpenseRequest} from '../../../types';
import {ComplaintService} from '../../../services/complaint.service';
import {ItemService} from '../../../services/item.service';
import {ReportService} from '../../../services/report.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ComplaintStatusDialogComponent} from "../complaint-status-dialog/complaint-status-dialog.component";
import {ComplaintResolutionDialogComponent} from "../complaint-resolution-dialog/complaint-resolution-dialog.component";
import {MatDialog} from "@angular/material";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {ComplaintStatus, ExpenseType, Resolution} from "../../../globals";

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {

  isComplaintLoaded = false;
  complaint: Complaint;

  constructor(private complaintService: ComplaintService, private route: ActivatedRoute,
              private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.fetchComplaint();
  }

  fetchComplaint() {
    this.complaintService.fetchOneComplaint(this.route.snapshot.params['id']).subscribe(res => {
      this.complaint = res;
    }, err => {
      if (err.status == 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err);
      }
    }, () => {
      this.isComplaintLoaded = true;
    });
  }

  updateComplaintStatus() {
    let status = [];
    if (this.complaint.status === ComplaintStatus.IN_PROGRESS) {
      status = ['ACCEPTED', 'DECLINED'];
    } else if (this.complaint.status === 'DECLINED') {
      status = ['DECLINED_ITEM_SENT'];
    } else if (this.complaint.status === 'ACCEPTED') {
      if (this.complaint.resolution === Resolution.EXCHANGE_FOR_NEW) {
        status = ['NEW_ITEM_SENT'];
      } else if (this.complaint.resolution === Resolution.MONEY_RETURN) {
        status = ['MONEY_RETURNED'];
      } else if (this.complaint.resolution === Resolution.REPAIR) {
        status = ['REPAIRING_ITEM'];
      }
    } else if (this.complaint.status === ComplaintStatus.REPAIRING_ITEM) {
      status = ['REPAIRED_ITEM_SENT'];
    }

    const dialogRef = this.dialog.open(ComplaintStatusDialogComponent, {
      width: '350px',
      data: {
        status: status,
        complaint: this.complaint
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isComplaintLoaded = false;
      this.fetchComplaint();
    });
  }

  updateComplaintResolution() {
    let resolution = [];
    if (this.complaint.resolution === Resolution.UNRESOLVED) {
      resolution = ['MONEY_RETURN', 'REPAIR', 'EXCHANGE_FOR_NEW'];
    }
    const dialogRef = this.dialog.open(ComplaintResolutionDialogComponent, {
      width: '350px',
      data: {
        status: resolution,
        complaint: this.complaint
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isComplaintLoaded = false;
      this.fetchComplaint();
    });
  }

  canUpdateStatus(): boolean {
    return (!this.complaint.status.toLocaleString().includes('SENT') && this.complaint.status !== ComplaintStatus.ACCEPTED) ||
      (this.complaint.status === ComplaintStatus.ACCEPTED && this.complaint.resolution !== 'UNRESOLVED');
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/complaints']));
  }

}
