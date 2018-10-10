import {Component, Inject, OnInit} from '@angular/core';
import {PlanningService} from "../../../services/planning.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SpecialPlanRequest} from "../../../types";

export interface DialogData {
  date: Date;
}

@Component({
  selector: 'app-special-plan-no-date-dialog',
  templateUrl: './special-plan-no-date-dialog.component.html',
  styleUrls: ['./special-plan-no-date-dialog.component.scss']
})
export class SpecialPlanNoDateDialogComponent {

  form: FormGroup;
  description: FormControl;
  employeesPerDay: FormControl;
  ordersPerDay: FormControl;
  returnsPerDay: FormControl;
  complaintsResolvedPerDay: FormControl;
  error: string;
  shouldShowError: boolean;

  constructor(public dialogRef: MatDialogRef<SpecialPlanNoDateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private planningService: PlanningService) {
    this.setupFormControls();
    this.form = new FormGroup({
      "description": this.description,
      "employeesPerDay": this.employeesPerDay,
      "ordersPerDay": this.ordersPerDay,
      "returnsPerDay": this.returnsPerDay,
      "complaintsResolvedPerDay": this.complaintsResolvedPerDay
    });
  }

  setupFormControls() {
    this.description = new FormControl('', [
      Validators.required
    ]);
    this.employeesPerDay = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.ordersPerDay = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.returnsPerDay = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
    this.complaintsResolvedPerDay = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    const specialPlanRequest: SpecialPlanRequest = {
      description: this.form.get('description').value,
      day: this.data.date.toString().includes('T') ?
        this.data.date.toISOString().substring(0, this.data.date.toISOString().indexOf('T')) : this.data.date.toString(),
      employeesPerDay: this.form.get('employeesPerDay').value,
      ordersPerDay: this.form.get('ordersPerDay').value,
      returnsPerDay: this.form.get('returnsPerDay').value,
      complaintsResolvedPerDay: this.form.get('complaintsResolvedPerDay').value
    };

    this.planningService.addSpecialPlan(specialPlanRequest).subscribe(() => {
      },
      err => {
        this.shouldShowError = true;
        this.error = err.error;
      }, () => {
        this.cancel();
      });
  }
}
