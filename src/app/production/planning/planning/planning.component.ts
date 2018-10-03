import {Component, OnInit} from '@angular/core';
import {PlanningService} from '../../../services/planning.service';
import {DailyPlan, SpecialPlanRequest} from '../../../types';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material";
import {SpecialPlanDialogComponent} from "../special-plan-dialog/special-plan-dialog.component";
import {SpecialPlanNoDateDialogComponent} from "../special-plan-no-date-dialog/special-plan-no-date-dialog.component";

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
  isDailyPlanLoaded = false;
  isTodayLoaded = false;
  isTomorrowLoaded = false;
  isInTwoDaysLoaded = false;

  constructor(private planningService: PlanningService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchDailyPlan();
    this.fetchOrders();
  }

  fetchDailyPlan() {
    this.planningService.fetchDailyPlan().subscribe(res => {
      this.dailyPlan = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isDailyPlanLoaded = true;
    });
  }

  fetchOrders() {
    this.fetchOrdersForDay('today');
    this.fetchOrdersForDay('tomorrow');
    this.fetchOrdersForDay('in2days');
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
        console.log(err);
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

}
