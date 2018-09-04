import {Component} from '@angular/core';
import {DailyPlanRequest} from "../types";
import {PlanningService} from "../planning.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-daily-plan',
  templateUrl: './update-daily-plan.component.html',
  styleUrls: ['./update-daily-plan.component.css']
})
export class UpdateDailyPlanComponent {

  dailyPlanRequest: DailyPlanRequest;
  employeesPerDay: number;
  ordersPerDay: number;
  returnsPerDay: number;
  complaintsResolvedPerDay: number;

  constructor(private planningService: PlanningService, private router: Router) {
  }

  submitForm() {
    this.dailyPlanRequest = {
      employeesPerDay: this.employeesPerDay,
      ordersPerDay: this.ordersPerDay,
      returnsPerDay: this.returnsPerDay,
      complaintsResolvedPerDay: this.complaintsResolvedPerDay
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
