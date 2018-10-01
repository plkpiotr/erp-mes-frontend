import {inject, TestBed} from '@angular/core/testing';

import {HolidayService} from '../app/services/holiday.service';
import {AddHolidayComponent} from '../app/staff/holidays/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/staff/employees/add-employee/add-employee.component';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {EmployeeComponent} from '../app/staff/employees/employee/employee.component';
import {EmployeesComponent} from '../app/staff/employees/employees/employees.component';
import {TeamComponent} from '../app/staff/teams/team/team.component';
import {TeamsComponent} from '../app/staff/teams/teams/teams.component';
import {EmployeeService} from '../app/services/employee.service';
import {TeamService} from '../app/services/team.service';
import {ApprovalState, HolidayType, Role} from '../app/types';
import {TasksComponent} from '../app/production/tasks/tasks/tasks.component';
import {TaskService} from '../app/services/task.service';
import {TaskComponent} from '../app/production/tasks/task/task.component';
import {AddTaskComponent} from '../app/production/tasks/add-task/add-task.component';
import {ReportService} from '../app/services/report.service';
import {ReportsComponent} from '../app/production/finance/reports/reports.component';
import {ReportComponent} from '../app/production/finance/report/report.component';
import {CurrentReportComponent} from '../app/production/finance/current-report/current-report.component';
import {DeliveryService} from '../app/services/delivery.service';
import {ItemService} from '../app/services/item.service';
import {DeliveriesComponent} from '../app/shop/deliveries/deliveries/deliveries.component';
import {DeliveryComponent} from '../app/shop/deliveries/delivery/delivery.component';
import {ItemComponent} from '../app/shop/items/item/item.component';
import {ItemsComponent} from '../app/shop/items/items/items.component';
import {AddItemComponent} from '../app/shop/items/add-item/add-item.component';
import {AddDeliveryComponent} from '../app/shop/deliveries/add-delivery/add-delivery.component';
import {LoginComponent} from '../app/security/login/login.component';
import {ValidateComponent} from '../app/security/validate/validate.component';
import {SpecialPlansComponent} from '../app/production/planning/special-plans/special-plans.component';
import {PlanningComponent} from '../app/production/planning/planning/planning.component';
import {UpdateDailyPlanComponent} from '../app/production/planning/update-daily-plan/update-daily-plan.component';
import {PlanningService} from '../app/services/planning.service';
import {NotificationService} from '../app/services/notification.service';
import {SuggestionService} from '../app/services/suggestion.service';
import {OrderService} from '../app/services/order.service';
import {AddOrderComponent} from '../app/shop/orders/add-order/add-order.component';
import {AddNotificationComponent} from '../app/communication/notifications/add-notification/add-notification.component';
import {AddSuggestionComponent} from '../app/communication/suggestions/add-suggestion/add-suggestion.component';
import {OrderComponent} from '../app/shop/orders/order/order.component';
import {OrdersComponent} from '../app/shop/orders/orders/orders.component';
import {NotificationComponent} from '../app/communication/notifications/notification/notification.component';
import {NotificationsComponent} from '../app/communication/notifications/notifications/notifications.component';
import {SuggestionComponent} from '../app/communication/suggestions/suggestion/suggestion.component';
import {SuggestionsComponent} from '../app/communication/suggestions/suggestions/suggestions.component';
import {ReturnService} from '../app/services/return.service';
import {ComplaintService} from '../app/services/complaint.service';
import {ReturnComponent} from '../app/shop/returns/return/return.component';
import {ReturnsComponent} from '../app/shop/returns/returns/returns.component';
import {ComplaintComponent} from '../app/shop/complaints/complaint/complaint.component';
import {ComplaintsComponent} from '../app/shop/complaints/complaints/complaints.component';
import {ConversationComponent} from '../app/communication/emails/conversation/conversation.component';
import {AddEmailComponent} from '../app/communication/emails/add-email/add-email.component';
import {OutboxComponent} from '../app/communication/emails/outbox/outbox.component';
import {InboxComponent} from '../app/communication/emails/inbox/inbox.component';
import {EmailService} from '../app/services/email.service';
import {KanbanComponent} from '../app/production/tasks/kanban/kanban.component';

const mockContract = {
  id: 1,
  accountNumber: '11111111111111111111111111',
  daysOffPerYear: 26,
  salary: 3000.00
};

const mockEmployee = {
  id: 1,
  firstName: 'Ala',
  lastName: 'Makota',
  email: 'ala.makota@gmail.com',
  role: Role.ACCOUNTANT,
  password: 'aaa333aa',
  passwordValid: false,
  contract: mockContract
};

const mockHolidays = [
  {
    id: 1,
    startDate: new Date('2018-08-15'),
    duration: 5,
    holidayType: HolidayType.VACATION,
    approvalState: ApprovalState.PENDING,
    employee: mockEmployee
  },
  {
    id: 2,
    startDate: new Date('2018-08-31'),
    duration: 5,
    holidayType: HolidayType.VACATION,
    approvalState: ApprovalState.PENDING,
    employee: mockEmployee
  }
];

const mockApprovedHoliday = {
  id: 1,
  startDate: new Date('2018-08-15'),
  duration: 5,
  holidayType: HolidayType.VACATION,
  approvalState: ApprovalState.APPROVED,
  employee: mockEmployee
};

const mockHolidayRequest = {
  startDate: new Date('2018-09-15'),
  duration: 14,
  holidayType: HolidayType.VACATION
};

describe('HolidayService', () => {
  let service: HolidayService;
  let httpMock: HttpTestingController;

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
        AddOrderComponent,
        AddNotificationComponent,
        AddSuggestionComponent,
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
        OrderComponent,
        OrdersComponent,
        NotificationComponent,
        NotificationsComponent,
        SuggestionComponent,
        SuggestionsComponent,
        UpdateDailyPlanComponent,
        PlanningComponent,
        SpecialPlansComponent,
        ComplaintsComponent,
        ComplaintComponent,
        ReturnsComponent,
        ReturnComponent,
        InboxComponent,
        OutboxComponent,
        AddEmailComponent,
        ConversationComponent,
        KanbanComponent
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
        OrderService,
        NotificationService,
        SuggestionService,
        ComplaintService,
        ReturnService,
        EmailService
      ]
    });
    service = TestBed.get(HolidayService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([HolidayService], () => {
    expect(service).toBeTruthy();
  }));

  describe('given fetchHolidays method', () => {
    describe('when called', () => {

      it('should hit "/employees/{employeeId}/holidays" with GET and return holidays', () => {
        service.fetchHolidays(1).subscribe(holidays => {
          expect(holidays.length).toBe(2);
          expect(holidays).toEqual(mockHolidays);

          const req = httpMock.expectOne('http://localhost:8080/employees/1/holidays');
          expect(req.request.method).toBe('GET');
          req.flush(mockHolidays);

          httpMock.verify();
        });
      });
    });
  });

  describe('given addHoliday method', () => {
    describe('when called', () => {

      it('should hit "/holidays/add" with POST', () => {
        service.addHoliday(mockHolidayRequest, 1);

        const req = httpMock.expectOne('http://localhost:8080/employees/1/holidays');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given fetchHolidaysToApprove method', () => {
    describe('when called', () => {

      it('should hit "/employees/{managerId}/subordinates/holiday-requests" with GET and return holidays', () => {
        service.fetchHolidaysToApprove(1).subscribe(holidays => {
          expect(holidays.length).toBe(2);
          expect(holidays).toEqual(mockHolidays);

          const req = httpMock.expectOne('http://localhost:8080/employees/1/subordinates/holiday-requests');
          expect(req.request.method).toBe('GET');
          req.flush(mockHolidays);

          httpMock.verify();
        });
      });
    });
  });

  describe('given manageHolidays method', () => {
    describe('when called', () => {

      it('should hit "/employees/{managerId}/subordinates/{subordinateId}/holidays" with POST', () => {
        service.manageHolidays(1, 2, 1, 'true').subscribe(holiday => {
          expect(holiday.approvalState).toBe(ApprovalState.APPROVED);
          expect(holiday).toEqual(mockApprovedHoliday);

          const req = httpMock.expectOne('http://localhost:8080/employees/1/subordinates/2/holidays');
          expect(req.request.method).toBe('POST');
          req.flush(mockApprovedHoliday);

          httpMock.verify();
        });
      });
    });
  });
});
