import {Component, OnInit} from '@angular/core';
import {PlanningService} from '../../../services/planning.service';
import {DailyPlan, SpecialPlan} from '../../../types';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {SpecialPlanDialogComponent} from "../special-plan-dialog/special-plan-dialog.component";
import {SpecialPlanNoDateDialogComponent} from "../special-plan-no-date-dialog/special-plan-no-date-dialog.component";
import {ShowSpecialPlanDialogComponent} from "../show-special-plan-dialog/show-special-plan-dialog.component";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  dailyPlan: DailyPlan;
  ordersToday: number;
  ordersTomorrow: number;
  ordersInTwoDays: number;
  returnsToday: number;
  returnsTommorrow: number;
  returnsInTwoDays: number;
  complaintsToday: number;
  complaintsTomorrow: number;
  complaintsInTwoDays: number;
  isDailyPlanLoaded = false;
  isTodayLoaded = false;
  isTomorrowLoaded = false;
  isInTwoDaysLoaded = false;
  specialPlanTomorrow: SpecialPlan;
  isTomorrowPlanLoaded: boolean;
  specialPlanInTwoDays: SpecialPlan;
  isInTwoDaysPlanLoaded: boolean;

  constructor(private planningService: PlanningService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    const inTwoDays = new Date(today.setDate(today.getDate() + 1));
    this.planningService.fetchSpecialPlan(tomorrow.toISOString().substring(0, tomorrow.toISOString().indexOf('T')))
      .subscribe(res => this.specialPlanTomorrow = res,
        err => this.showError(err),
        () => this.isTomorrowPlanLoaded = true);
    this.planningService.fetchSpecialPlan(inTwoDays.toISOString().substring(0, inTwoDays.toISOString().indexOf('T')))
      .subscribe(res => this.specialPlanInTwoDays = res,
        err => this.showError(err),
        () => this.isInTwoDaysPlanLoaded = true);
    this.fetchDailyPlan();
    this.fetchOrders();
  }

  fetchDailyPlan() {
    this.planningService.fetchDailyPlan().subscribe(res => {
      this.dailyPlan = res;
    }, err => {
      this.showError(err);
    }, () => {
      this.isDailyPlanLoaded = true;
    });
  }

  fetchOrders() {
    this.fetchOrdersForDay('today');
    this.fetchOrdersForDay('tomorrow');
    this.fetchOrdersForDay('in2days');
    this.fetchReturnsForDay('today');
    this.fetchReturnsForDay('tomorrow');
    this.fetchReturnsForDay('in2days');
    this.fetchComplaintsForDay('today');
    this.fetchComplaintsForDay('tomorrow');
    this.fetchComplaintsForDay('in2days');
  }

  fetchOrdersForDay(when: string) {
    this.planningService.countScheduledOrders(when).subscribe(res => {
        switch (when) {
          case 'today':
            this.ordersToday = res;
            break;
          case 'tomorrow':
            this.ordersTomorrow = res;
            break;
          case 'in2days':
            this.ordersInTwoDays = res;
            break;
        }
      }, err => {
       this.showError(err);
      }, () => {
        switch (when) {
          case 'today':
            this.isTodayLoaded = true;
            break;
          case 'tomorrow':
            this.isTomorrowLoaded = true;
            break;
          case 'in2days':
            this.isInTwoDaysLoaded = true;
            break;
        }
      }
    );
  }

  fetchReturnsForDay(when: string) {
    this.planningService.countScheduledReturns(when).subscribe(res => {
        switch (when) {
          case 'today':
            this.returnsToday = res;
            break;
          case 'tomorrow':
            this.returnsTommorrow = res;
            break;
          case 'in2days':
            this.returnsInTwoDays = res;
            break;
        }
      }, err => {
        this.showError(err);
      }, () => {
      }
    );
  }

  fetchComplaintsForDay(when: string) {
    this.planningService.countScheduledComplaints(when).subscribe(res => {
        switch (when) {
          case 'today':
            this.complaintsToday = res;
            break;
          case 'tomorrow':
            this.complaintsTomorrow = res;
            break;
          case 'in2days':
            this.complaintsInTwoDays = res;
            break;
        }
      }, err => {
        this.showError(err);
      }, () => {
      }
    );
  }

  updateDailyPlan() {
    this.router.navigate(['/planning/update']);
  }

  tomorrowSpecialPlan() {
    let day = new Date();
    day.setDate(day.getDate() + 1);

    const dialogRef = this.dialog.open(SpecialPlanNoDateDialogComponent, {
      width: '350px',
      data: {
        date: day
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDailyPlanLoaded = false;
      this.fetchDailyPlan();
      this.fetchOrders();
    });
  }

  inTwoDaysSpecialPlan() {
    let day = new Date();
    day.setDate(day.getDate() + 2);

    const dialogRef = this.dialog.open(SpecialPlanNoDateDialogComponent, {
      width: '350px',
      data: {
        date: day
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDailyPlanLoaded = false;
      this.fetchDailyPlan();
      this.fetchOrders();
    });
  }

  addSpecialPlan() {
    const dialogRef = this.dialog.open(SpecialPlanDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDailyPlanLoaded = false;
      this.fetchDailyPlan();
      this.fetchOrders();
    });
  }

  shouldShowPlanForTomorrow() {
    return (this.ordersTomorrow > this.dailyPlan.ordersPerDay ||
      this.returnsTommorrow > this.dailyPlan.returnsPerDay ||
      this.complaintsTomorrow > this.dailyPlan.complaintsResolvedPerDay) &&
      this.specialPlanTomorrow.id === 0;
}

  shouldShowPlanForTwoDays() {
    return (this.ordersInTwoDays > this.dailyPlan.ordersPerDay ||
      this.returnsInTwoDays > this.dailyPlan.returnsPerDay ||
      this.complaintsInTwoDays > this.dailyPlan.complaintsResolvedPerDay) &&
      this.specialPlanInTwoDays.id === 0;
  }

  showPlan(plan: SpecialPlan) {
    this.dialog.open(ShowSpecialPlanDialogComponent, {
      width: '350px',
      data: {
        specialPlan: plan
      }
    });
  }

  showError(err) {
    this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });
  }

}
