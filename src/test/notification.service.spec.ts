import {TestBed} from '@angular/core/testing';

import {TaskService} from '../app/services/task.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {AddEmployeeComponent} from '../app/staff/employees/add-employee/add-employee.component';
import {AddHolidayComponent} from '../app/staff/holidays/add-holiday/add-holiday.component';
import {AddTaskComponent} from '../app/production/tasks/add-task/add-task.component';
import {EmployeeComponent} from '../app/staff/employees/employee/employee.component';
import {EmployeesComponent} from '../app/staff/employees/employees/employees.component';
import {TeamComponent} from '../app/staff/teams/team/team.component';
import {TeamsComponent} from '../app/staff/teams/teams/teams.component';
import {TasksComponent} from '../app/production/tasks/tasks/tasks.component';
import {TaskComponent} from '../app/production/tasks/task/task.component';
import {CurrentReportComponent} from '../app/production/finance/current-report/current-report.component';
import {ReportComponent} from '../app/production/finance/report/report.component';
import {ReportsComponent} from '../app/production/finance/reports/reports.component';
import {EmployeeService} from '../app/services/employee.service';
import {HolidayService} from '../app/services/holiday.service';
import {TeamService} from '../app/services/team.service';
import {ReportService} from '../app/services/report.service';
import {Category, Role, State} from '../app/types';
import {DeliveriesComponent} from '../app/shop/deliveries/deliveries/deliveries.component';
import {AddItemComponent} from '../app/shop/items/add-item/add-item.component';
import {ValidateComponent} from '../app/security/validate/validate.component';
import {ItemComponent} from '../app/shop/items/item/item.component';
import {ItemsComponent} from '../app/shop/items/items/items.component';
import {AddDeliveryComponent} from '../app/shop/deliveries/add-delivery/add-delivery.component';
import {DeliveryComponent} from '../app/shop/deliveries/delivery/delivery.component';
import {LoginComponent} from '../app/security/login/login.component';
import {ItemService} from '../app/services/item.service';
import {DeliveryService} from '../app/services/delivery.service';
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
import {ReturnComponent} from "../app/shop/returns/return/return.component";
import {ReturnsComponent} from "../app/shop/returns/returns/returns.component";
import {ComplaintComponent} from "../app/shop/complaints/complaint/complaint.component";
import {ComplaintsComponent} from "../app/shop/complaints/complaints/complaints.component";
import {ReturnService} from "../app/services/return.service";
import {ComplaintService} from "../app/services/complaint.service";
import {PlanningComponent} from "../app/production/planning/planning/planning.component";
import {SpecialPlansComponent} from "../app/production/planning/special-plans/special-plans.component";
import {UpdateDailyPlanComponent} from "../app/production/planning/update-daily-plan/update-daily-plan.component";
import {InboxComponent} from "../app/communication/emails/inbox/inbox.component";
import {OutboxComponent} from "../app/communication/emails/outbox/outbox.component";
import {AddEmailComponent} from "../app/communication/emails/add-email/add-email.component";
import {ConversationComponent} from "../app/communication/emails/conversation/conversation.component";
import {EmailService} from "../app/services/email.service";

const mockNotifications = [
  {
    id: 1,
    state: State.REPORTED,
    instruction: 'Uszkodzona przesyłka podczas transportu',
    description: 'Przesłać uwagi przełożonemu',
    notifier: {
      id: 1,
      firstName: 'Jakub',
      lastName: 'Kowalski',
      email: 'jakub.kowalski@domain.com',
      role: Role.ADMIN,
      password: 'nsofbdie',
      contract: {
        id: 1,
        accountNumber: '75139348954923829450242711',
        daysOffPerYear: 26,
        salary: 2700.00
      },
      passwordValid: false
    },
    transferee: null,
    creationTime: new Date('December 30, 2016 07:25:00'),
    consignees: [
      {
        id: 2,
        firstName: 'Hubert',
        lastName: 'Wojciechowski',
        email: 'hubert.wojciechowski@hubwoj.pl',
        role: Role.ADMIN,
        password: 'ssdbager',
        contract: {
          id: 2,
          accountNumber: '83139348954923829450242727',
          daysOffPerYear: 26,
          salary: 3000.00
        },
        passwordValid: false
      },
      {
        id: 3,
        firstName: 'Anna',
        lastName: 'Koniecpolska',
        email: 'anna.koniecpolska@annak.pl',
        role: Role.ADMIN,
        password: 'aawerbds',
        contract: {
          id: 3,
          accountNumber: '75139348951123829450241127',
          daysOffPerYear: 26,
          salary: 2400.00
        },
        passwordValid: false
      }
    ],
    type: null,
    reference: null
  },
  {
    id: 1,
    state: State.REPORTED,
    instruction: 'Brak jednego z przedmiotów do wysłania zamówienia',
    description: 'Zadzwonić do odbiorcy',
    notifier: {
      id: 1,
      firstName: 'Jakub',
      lastName: 'Kowalski',
      email: 'jakub.kowalski@domain.com',
      role: Role.ADMIN,
      password: 'nsofbdie',
      contract: {
        id: 1,
        accountNumber: '75139348954923829450242711',
        daysOffPerYear: 26,
        salary: 2700.00
      },
      passwordValid: false
    },
    transferee: null,
    creationTime: new Date('December 30, 2016 07:25:00'),
    consignees: [
      {
        id: 2,
        firstName: 'Hubert',
        lastName: 'Wojciechowski',
        email: 'hubert.wojciechowski@hubwoj.pl',
        role: Role.ADMIN,
        password: 'ssdbager',
        contract: {
          id: 2,
          accountNumber: '83139348954923829450242727',
          daysOffPerYear: 26,
          salary: 3000.00
        },
        passwordValid: false
      },
      {
        id: 3,
        firstName: 'Anna',
        lastName: 'Koniecpolska',
        email: 'anna.koniecpolska@annak.pl',
        role: Role.ADMIN,
        password: 'aawerbds',
        contract: {
          id: 3,
          accountNumber: '75139348951123829450241127',
          daysOffPerYear: 26,
          salary: 2400.00
        },
        passwordValid: false
      }
    ],
    type: null,
    reference: null
  }
];

const mockNotificationRequest = {
  instruction: 'Brak kopert dla listów poleconych',
  description: null,
  notifierId: null,
  consigneeIds: [2, 3],
  type: null,
  reference: null,
};

describe('NotificationService', () => {
  let notificationService: NotificationService;
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
        ComplaintsComponent,
        ComplaintComponent,
        ReturnsComponent,
        ReturnComponent,
        PlanningComponent,
        SpecialPlansComponent,
        UpdateDailyPlanComponent,
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
        OrderService,
        NotificationService,
        SuggestionService,
        ReturnService,
        ComplaintService,
        EmailService
      ]
    });
    notificationService = TestBed.get(NotificationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  describe('given fetchNotifications method', () => {
    describe('when called', () => {
      it('should hit "/notifications" with GET and return notifications', () => {
        notificationService.fetchAllNotifications().subscribe(notifications => {
          expect(notifications.length).toBe(2);
          expect(notifications).toEqual(mockNotifications);
          const req = httpMock.expectOne('http://localhost:8080/notifications/');
          expect(req.request.method).toBe('GET');
          req.flush(mockNotifications);
          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneNotification method', () => {
    describe('when called', () => {
      it('should hit "notifications/1" with GET and return notification', () => {
        notificationService.fetchOneNotification(1).subscribe(notification => {
          expect(notification).toEqual(mockNotifications[0]);
        });
        const req = httpMock.expectOne('http://localhost:8080/notifications/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockNotifications[0]);
        httpMock.verify();
      });
    });
  });

  describe('given fetchNotificationsByRecipient method', () => {
    describe('when called', () => {
      it('should hit "/employees/1/notifications" with GET and return notifications by recipient', () => {
        notificationService.fetchNotificationsByRecipient(2).subscribe(notifications => {
          expect(notifications.length).toBe(2);
          expect(notifications).toEqual(mockNotifications);
          const req = httpMock.expectOne('http://localhost:8080/employees/2/notifications');
          expect(req.request.method).toBe('GET');
          req.flush(mockNotifications);
          httpMock.verify();
        });
      });
    });
  });

  describe('given addNotification method', () => {
    describe('when called', () => {
      it('should hit "/notifications/add" with POST', () => {
        notificationService.addNotification(mockNotificationRequest).subscribe(() => {
        });
        const req = httpMock.expectOne('http://localhost:8080/notifications');
        expect(req.request.method).toBe('POST');
        httpMock.verify();
      });
    });
  });
});
