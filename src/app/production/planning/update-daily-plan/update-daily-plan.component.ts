import {Component} from '@angular/core';
import {DailyPlanRequest} from '../../../types';
import {PlanningService} from '../../../services/planning.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-daily-plan',
  templateUrl: './update-daily-plan.component.html',
  styleUrls: ['./update-daily-plan.component.scss']
})
export class UpdateDailyPlanComponent {

  dailyPlanRequest: DailyPlanRequest;
  form: FormGroup;
  employeesPerDay: FormControl;
  ordersPerDay: FormControl;
  returnsPerDay: FormControl;
  complaintsResolvedPerDay: FormControl;

  constructor(private planningService: PlanningService, private router: Router) {
    this.setupFormControls();
    this.form = new FormGroup({
      "employeesPerDay": this.employeesPerDay,
      "ordersPerDay": this.ordersPerDay,
      "returnsPerDay": this.returnsPerDay,
      "complaintsResolvedPerDay": this.complaintsResolvedPerDay
    });
  }

  setupFormControls() {
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

  submitForm() {
    this.dailyPlanRequest = {
      employeesPerDay: this.form.get('employeesPerDay').value,
      ordersPerDay: this.form.get('ordersPerDay').value,
      returnsPerDay: this.form.get('returnsPerDay').value,
      complaintsResolvedPerDay: this.form.get('complaintsResolvedPerDay').value
    };
    this.planningService.updateDailyPlan(this.dailyPlanRequest).subscribe(() => {
      },
      err => {
        console.log(err);
      }, () => {
        this.router.navigate(['/planning']);
      });
  }
}
