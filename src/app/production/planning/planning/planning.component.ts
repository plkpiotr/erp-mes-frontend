import {Component, OnInit} from '@angular/core';
import {PlanningService} from '../../../services/planning.service';
import {DailyPlan, SpecialPlanRequest} from '../../../types';
import {Router} from "@angular/router";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  dailyPlan: DailyPlan;
  ordersToday: number;
  ordersTomorrow: number;
  ordersInTwoDays: number;
  description: string;
  day: Date;
  employeesPerDay: number;
  ordersPerDay: number;
  returnsPerDay: number;
  complaintsResolvedPerDay: number;
  specialPlanRequest: SpecialPlanRequest;
  isDailyPlanLoaded = false;
  isTodayLoaded = false;
  isTomorrowLoaded = false;
  isInTwoDaysLoaded = false;
  showAddSpecialPlan = false;

  constructor(private planningService: PlanningService, private router: Router) {
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
    this.day = new Date();
    this.day.setDate(this.day.getDate() + 1);
    this.showAddSpecialPlan = true;
  }

  inTwoDaysSpecialPlan() {
    this.day = new Date();
    this.day.setDate(this.day.getDate() + 2);
    this.showAddSpecialPlan = true;
  }

  submitForm() {
    this.specialPlanRequest = {
      description: this.description,
      day: this.day.toString().includes('T') ?
        this.day.toISOString().substring(0, this.day.toISOString().indexOf('T')) : this.day.toString(),
      employeesPerDay: this.employeesPerDay,
      ordersPerDay: this.ordersPerDay,
      returnsPerDay: this.returnsPerDay,
      complaintsResolvedPerDay: this.complaintsResolvedPerDay
    };

    this.planningService.addSpecialPlan(this.specialPlanRequest).subscribe(() => {
      },
      err => {
        console.log(err);
      }, () => {
        this.showAddSpecialPlan = false;
        this.description = null;
        this.day = null;
        this.employeesPerDay = null;
        this.returnsPerDay = null;
        this.ordersPerDay = null;
        this.complaintsResolvedPerDay = null;
        this.isInTwoDaysLoaded = false;
        this.isTomorrowLoaded = false;
        this.isTodayLoaded = false;
        this.isDailyPlanLoaded = false;
        this.fetchDailyPlan();
        this.fetchOrders();
      });
  }

}
