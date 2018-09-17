import {Component, OnInit} from '@angular/core';
import {PlanningService} from "../planning.service";
import {SpecialPlan} from "../types";

@Component({
  selector: 'app-special-plans',
  templateUrl: './special-plans.component.html',
  styleUrls: ['./special-plans.component.css']
})
export class SpecialPlansComponent implements OnInit {

  specialPlans: Array<SpecialPlan>;
  visibleSpecialPlans: Array<SpecialPlan>;
  arePlansLoaded = false;

  plansPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

  constructor(private planningService: PlanningService) {
  }

  ngOnInit() {
    this.planningService.fetchSpecialPlans().subscribe(res => {
      this.specialPlans = res;
    }, err => {
      console.log(err);
    }, () => {
      this.arePlansLoaded = true;
      this.setVisiblePlans();
      this.setPageNumbers();
    });
  }

  setVisiblePlans() {
    const pageIndex = (this.selectedPage - 1) * this.plansPerPage;
    this.visibleSpecialPlans = this.specialPlans.slice(
      pageIndex,
      pageIndex + this.plansPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.specialPlans.length / this.plansPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisiblePlans();
  }
}
