import {Component, Inject} from '@angular/core';
import {Complaint} from "../../../types";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ComplaintService} from "../../../services/complaint.service";

export interface DialogData {
  status: string[];
  complaint: Complaint;
}

@Component({
  selector: 'app-complaint-resolution-dialog',
  templateUrl: './complaint-resolution-dialog.component.html',
  styleUrls: ['./complaint-resolution-dialog.component.scss']
})
export class ComplaintResolutionDialogComponent {

  showSpinner: boolean;
  error: string;
  shouldShowError: boolean;

  constructor(public dialogRef: MatDialogRef<ComplaintResolutionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private complaintService: ComplaintService) {
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit(s: string) {
    this.showSpinner = true;
    this.complaintService.updateComplaintResolution(s, this.data.complaint.id).subscribe(res => {
    }, err => {
      this.shouldShowError = true;
      this.error = err.error;
      this.showSpinner = false;
    }, () => {
      this.cancel();
    });
  }


}
