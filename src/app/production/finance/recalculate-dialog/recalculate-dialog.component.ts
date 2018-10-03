import {Component, Inject} from '@angular/core';
import {ReportService} from "../../../services/report.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface DialogData {
  estimatedIncome: number;
  estimatedShipping: number;
  estimatedBills: number;
  rent: number;
  salaries: number;
  stockCosts: number;
  socialFund: number;
  unexpected: number;
}

@Component({
  selector: 'app-recalculate-dialog',
  templateUrl: './recalculate-dialog.component.html',
  styleUrls: ['./recalculate-dialog.component.scss']
})
export class RecalculateDialogComponent {

  constructor(public dialogRef: MatDialogRef<RecalculateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private reportService: ReportService) {
  }

  isFormValid() {
    const regexp = new RegExp('\\d{2}');
    return regexp.test(this.data.estimatedIncome.toString()) && regexp.test(this.data.estimatedShipping.toString())
      && regexp.test(this.data.estimatedBills.toString()) && regexp.test(this.data.rent.toString())
      && regexp.test(this.data.salaries.toString()) && regexp.test(this.data.stockCosts.toString())
      && regexp.test(this.data.socialFund.toString()) && regexp.test(this.data.unexpected.toString());
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    const estimatedCostsRequest = {
      estimatedIncome: this.data.estimatedIncome,
      estimatedShippingCosts: this.data.estimatedShipping,
      estimatedBills: this.data.estimatedBills,
      rent: this.data.rent,
      salaries: this.data.salaries,
      stockCosts: this.data.stockCosts,
      socialFund: this.data.socialFund,
      unexpected: this.data.unexpected
    };
    this.reportService.recalculateCosts(estimatedCostsRequest).subscribe(res => {
    }, err => {
      console.log(err);
    }, () => {
      this.cancel();
    });
  }

}
