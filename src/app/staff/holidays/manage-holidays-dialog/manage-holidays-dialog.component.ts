import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {HolidayService} from "../../../services/holiday.service";
import {Holiday} from "../../../types";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-manage-holidays-dialog',
  templateUrl: './manage-holidays-dialog.component.html',
  styleUrls: ['./manage-holidays-dialog.component.scss']
})
export class ManageHolidaysDialogComponent {

  holidayRequests: Holiday[];
  areRequestsLoaded: boolean;
  error: string;
  shouldShowError: boolean;

  constructor(
    public dialogRef: MatDialogRef<ManageHolidaysDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private holidayService: HolidayService) {
    this.fetchRequests();
  }

  fetchRequests() {
    this.holidayService.fetchHolidaysToApprove(this.data.id).subscribe(
      res => {
        this.holidayRequests = res;
      }, err => {
        this.shouldShowError = true;
        this.error = err.error;
      }, () => {
        this.areRequestsLoaded = true;
      }
    );
  }

  cancel() {
    this.dialogRef.close(null);
  }

  approve(holidayId: number, employeeId: number) {
    this.holidayService.manageHolidays(this.data.id, employeeId, holidayId, 'true')
      .subscribe(
        () => {},
        err => {
          this.shouldShowError = true;
          this.error = err.error;
        }, () => {
          this.areRequestsLoaded = false;
          this.fetchRequests();
        }
      );
  }

  decline(holidayId: number, employeeId: number) {
    this.holidayService.manageHolidays(this.data.id, employeeId, holidayId, 'false')
      .subscribe(
        () => {},
        err => {
          this.shouldShowError = true;
          this.error = err.error;
        }, () => {
          this.areRequestsLoaded = false;
          this.fetchRequests();
        }
      );
  }
}
