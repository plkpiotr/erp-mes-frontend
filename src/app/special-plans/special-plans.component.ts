import { Component, OnInit } from '@angular/core';
import {PlanningService} from "../planning.service";
import {SpecialPlan} from "../types";

@Component({
  selector: 'app-special-plans',
  templateUrl: './special-plans.component.html',
  styleUrls: ['./special-plans.component.css']
})
export class SpecialPlansComponent {

  specialPlans: SpecialPlan[];
  arePlansLoaded = false;

  constructor(private planningService: PlanningService) {
    this.planningService.fetchSpecialPlans().subscribe(res => {
      this.specialPlans = res;
    }, err => {
      console.log(err);
    }, () => {
      this.arePlansLoaded = true;
    })
  }

}
