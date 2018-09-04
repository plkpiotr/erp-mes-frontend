import {TestBed} from '@angular/core/testing';

import {TaskService} from '../app/task.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {AddTaskComponent} from '../app/add-task/add-task.component';
import {EmployeeComponent} from '../app/employee/employee.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {TeamComponent} from '../app/team/team.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {TasksComponent} from '../app/tasks/tasks.component';
import {TaskComponent} from '../app/task/task.component';
import {CurrentReportComponent} from '../app/current-report/current-report.component';
import {ReportComponent} from '../app/report/report.component';
import {ReportsComponent} from '../app/reports/reports.component';
import {EmployeeService} from '../app/employee.service';
import {HolidayService} from '../app/holiday.service';
import {TeamService} from '../app/team.service';
import {ReportService} from '../app/report.service';
import {Category, Role, State} from '../app/types';
import {DeliveriesComponent} from '../app/deliveries/deliveries.component';
import {AddItemComponent} from '../app/add-item/add-item.component';
import {ValidateComponent} from '../app/validate/validate.component';
import {ItemComponent} from '../app/item/item.component';
import {ItemsComponent} from '../app/items/items.component';
import {AddDeliveryComponent} from '../app/add-delivery/add-delivery.component';
import {DeliveryComponent} from '../app/delivery/delivery.component';
import {LoginComponent} from '../app/login/login.component';
import {ItemService} from '../app/item.service';
import {DeliveryService} from '../app/delivery.service';
import {NotificationService} from '../app/notification.service';
import {SuggestionService} from '../app/suggestion.service';
import {OrderService} from '../app/order.service';
import {AddOrderComponent} from '../app/add-order/add-order.component';
import {AddNotificationComponent} from '../app/add-notification/add-notification.component';
import {AddSuggestionComponent} from '../app/add-suggestion/add-suggestion.component';
import {OrderComponent} from '../app/order/order.component';
import {OrdersComponent} from '../app/orders/orders.component';
import {NotificationComponent} from '../app/notification/notification.component';
import {NotificationsComponent} from '../app/notifications/notifications.component';
import {SuggestionComponent} from '../app/suggestion/suggestion.component';
import {SuggestionsComponent} from '../app/suggestions/suggestions.component';

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
        SuggestionsComponent
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
        SuggestionService
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
