import {inject, TestBed} from '@angular/core/testing';

import {PlanningService} from '../app/services/planning.service';
import {DeliveryService} from '../app/services/delivery.service';
import {ItemService} from '../app/services/item.service';
import {ReportService} from '../app/services/report.service';
import {TaskService} from '../app/services/task.service';
import {TeamService} from '../app/services/team.service';
import {HolidayService} from '../app/services/holiday.service';
import {EmployeeService} from '../app/services/employee.service';
import {SpecialPlansComponent} from '../app/production/planning/special-plans/special-plans.component';
import {PlanningComponent} from '../app/production/planning/planning/planning.component';
import {UpdateDailyPlanComponent} from '../app/production/planning/update-daily-plan/update-daily-plan.component';
import {LoginComponent} from '../app/security/login/login.component';
import {ValidateComponent} from '../app/security/validate/validate.component';
import {DeliveriesComponent} from '../app/shop/deliveries/deliveries/deliveries.component';
import {DeliveryComponent} from '../app/shop/deliveries/delivery/delivery.component';
import {ItemComponent} from '../app/shop/items/item/item.component';
import {ItemsComponent} from '../app/shop/items/items/items.component';
import {ReportsComponent} from '../app/production/finance/reports/reports.component';
import {ReportComponent} from '../app/production/finance/report/report.component';
import {CurrentReportComponent} from '../app/production/finance/current-report/current-report.component';
import {TaskComponent} from '../app/production/tasks/task/task.component';
import {TasksComponent} from '../app/production/tasks/tasks/tasks.component';
import {TeamsComponent} from '../app/staff/teams/teams/teams.component';
import {TeamComponent} from '../app/staff/teams/team/team.component';
import {EmployeesComponent} from '../app/staff/employees/employees/employees.component';
import {EmployeeComponent} from '../app/staff/employees/employee/employee.component';
import {AddItemComponent} from '../app/shop/items/add-item/add-item.component';
import {AddDeliveryComponent} from '../app/shop/deliveries/add-delivery/add-delivery.component';
import {AddTaskComponent} from '../app/production/tasks/add-task/add-task.component';
import {AddHolidayComponent} from '../app/staff/holidays/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/staff/employees/add-employee/add-employee.component';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {ReturnService} from '../app/services/return.service';
import {ComplaintService} from '../app/services/complaint.service';
import {ReturnComponent} from '../app/shop/returns/return/return.component';
import {ReturnsComponent} from '../app/shop/returns/returns/returns.component';
import {ComplaintComponent} from '../app/shop/complaints/complaint/complaint.component';
import {ComplaintsComponent} from '../app/shop/complaints/complaints/complaints.component';
import {AddSuggestionComponent} from '../app/communication/suggestions/add-suggestion/add-suggestion.component';
import {AddNotificationComponent} from '../app/communication/notifications/add-notification/add-notification.component';
import {AddOrderComponent} from '../app/shop/orders/add-order/add-order.component';
import {NotificationsComponent} from '../app/communication/notifications/notifications/notifications.component';
import {NotificationComponent} from '../app/communication/notifications/notification/notification.component';
import {OrdersComponent} from '../app/shop/orders/orders/orders.component';
import {OrderComponent} from '../app/shop/orders/order/order.component';
import {SuggestionComponent} from '../app/communication/suggestions/suggestion/suggestion.component';
import {SuggestionsComponent} from '../app/communication/suggestions/suggestions/suggestions.component';
import {ConversationComponent} from '../app/communication/emails/conversation/conversation.component';
import {AddEmailComponent} from '../app/communication/emails/add-email/add-email.component';
import {OutboxComponent} from '../app/communication/emails/outbox/outbox.component';
import {InboxComponent} from '../app/communication/emails/inbox/inbox.component';
import {EmailService} from '../app/services/email.service';

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
        SpecialPlansComponent,
        ComplaintsComponent,
        ComplaintComponent,
        ReturnsComponent,
        ReturnComponent,
        OrderComponent,
        OrdersComponent,
        NotificationComponent,
        NotificationsComponent,
        SuggestionComponent,
        SuggestionsComponent,
        AddOrderComponent,
        AddNotificationComponent,
        AddSuggestionComponent,
        InboxComponent,
        OutboxComponent,
        AddEmailComponent,
        ConversationComponent
      ],
      providers: [
        EmployeeService,
        HolidayService,
        TeamService,
        TaskService,
        ReportService,
        ItemService,
        DeliveryService,
        PlanningService,
        ComplaintService,
        ReturnService,
        EmailService
      ]
    });
    service = TestBed.get(PlanningService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

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
