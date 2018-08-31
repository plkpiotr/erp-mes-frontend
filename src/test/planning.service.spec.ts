import {inject, TestBed} from '@angular/core/testing';

import {PlanningService} from '../app/planning.service';
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {ReportService} from "../app/report.service";
import {TaskService} from "../app/task.service";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
import {SpecialPlansComponent} from "../app/special-plans/special-plans.component";
import {PlanningComponent} from "../app/planning/planning.component";
import {UpdateDailyPlanComponent} from "../app/update-daily-plan/update-daily-plan.component";
import {LoginComponent} from "../app/login/login.component";
import {ValidateComponent} from "../app/validate/validate.component";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {ItemComponent} from "../app/item/item.component";
import {ItemsComponent} from "../app/items/items.component";
import {ReportsComponent} from "../app/reports/reports.component";
import {ReportComponent} from "../app/report/report.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {TaskComponent} from "../app/task/task.component";
import {TasksComponent} from "../app/tasks/tasks.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {TeamComponent} from "../app/team/team.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {AddItemComponent} from "../app/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {AddTaskComponent} from "../app/add-task/add-task.component";
import {AddHolidayComponent} from "../app/add-holiday/add-holiday.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";

const mockDailyPlan = {
  'id': 1,
  'employeesPerDay': 15,
  'ordersPerDay': 30,
  'returnsPerDay': 5,
  'complaintsResolvedPerDay': 5
};

const mockDailyPlanRequest = {
  'employeesPerDay': 15,
  'ordersPerDay': 30,
  'returnsPerDay': 5,
  'complaintsResolvedPerDay': 5
};

const mockSpecialPlans = [
  {
    'id': 1,
    'description': 'Some description',
    'day': new Date('2018-02-01'),
    'employeesPerDay': 15,
    'ordersPerDay': 30,
    'returnsPerDay': 5,
    'complaintsResolvedPerDay': 5
  },
  {
    'id': 2,
    'description': 'Another description',
    'day': new Date('2018-02-01'),
    'employeesPerDay': 15,
    'ordersPerDay': 30,
    'returnsPerDay': 5,
    'complaintsResolvedPerDay': 5
  }
];

const mockSpecialPlanRequest = {
  'description': 'Another description',
  'day': '2018-02-01',
  'employeesPerDay': 15,
  'ordersPerDay': 30,
  'returnsPerDay': 5,
  'complaintsResolvedPerDay': 5
};

let service: PlanningService;
let httpMock: HttpTestingController;

describe('PlanningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(appRoutes)
      ],
      declarations: [
        AddEmployeeComponent,
        AddHolidayComponent,
        AddTaskComponent,
        AddDeliveryComponent,
        AddItemComponent,
        EmployeeComponent,
        EmployeesComponent,
        TeamComponent,
        TeamsComponent,
        TasksComponent,
        TaskComponent,
        CurrentReportComponent,
        ReportComponent,
        ReportsComponent,
        ItemsComponent,
        ItemComponent,
        DeliveryComponent,
        DeliveriesComponent,
        ValidateComponent,
        LoginComponent,
        UpdateDailyPlanComponent,
        PlanningComponent,
        SpecialPlansComponent
      ],
      providers: [
        EmployeeService,
        HolidayService,
        TeamService,
        TaskService,
        ReportService,
        ItemService,
        DeliveryService,
        PlanningService
      ]
    });
    service = TestBed.get(PlanningService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([PlanningService], (service: PlanningService) => {
    expect(service).toBeTruthy();
  }));

  describe('given fetchDailyPlan method', () => {
    describe('when called', () => {

      it('should hit "/daily-plan" with GET and return daily plan', () => {
        service.fetchDailyPlan().subscribe(report => {
          expect(report).toEqual(mockDailyPlan);

          const req = httpMock.expectOne('http://localhost:8080/daily-plan');
          expect(req.request.method).toBe('GET');
          req.flush(mockDailyPlan);

          httpMock.verify();
        });
      });
    });
  });

  describe('given updateDailyPlan method', () => {
    describe('when called', () => {

      it('should hit "/daily-plan" with PUT', () => {
        service.updateDailyPlan(mockDailyPlanRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/daily-plan');
        expect(req.request.method).toBe('PUT');

        httpMock.verify();
      });
    });
  });

  describe('given fetchSpecialPlans method', () => {
    describe('when called', () => {

      it('should hit "/special-plans" with GET and return special plans', () => {
        service.fetchSpecialPlans().subscribe(plans => {
          expect(plans).toEqual(mockSpecialPlans);

          const req = httpMock.expectOne('http://localhost:8080/special-plans');
          expect(req.request.method).toBe('GET');
          req.flush(mockSpecialPlans);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchSpecialPlan method', () => {
    describe('when called', () => {

      it('should hit "/special-plan" with GET and return special plan for given day', () => {
        service.fetchSpecialPlan('2018-12-12').subscribe(plan => {
          expect(plan).toEqual(mockSpecialPlans[0]);

          const req = httpMock.expectOne('http://localhost:8080/special-plan');
          expect(req.request.method).toBe('GET');
          req.flush(mockSpecialPlans[0]);

          httpMock.verify();
        });
      });
    });
  });

  describe('given addSpecialPlan method', () => {
    describe('when called', () => {

      it('should hit "/special-plan" with POST', () => {
        service.addSpecialPlan(mockSpecialPlanRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/special-plan');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given countScheduledOrders method', () => {
    describe('when called', () => {

      it('should hit "/scheduled-orders" with GET and return special plan for given dayand get orders count for day', () => {
        service.countScheduledOrders('today').subscribe(num => {
          expect(num).toEqual(5);

          const req = httpMock.expectOne('http://localhost:8080/scheduled-orders');
          expect(req.request.method).toBe('GET');
          req.flush(5);

          httpMock.verify();
        });
      });
    });
  });
});
