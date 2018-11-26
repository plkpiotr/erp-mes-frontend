import {TestBed} from '@angular/core/testing';

import {EmployeeService} from '../app/services/employee.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {EmployeesComponent} from '../app/staff/employees/employees/employees.component';
import {AddEmployeeComponent} from '../app/staff/employees/add-employee/add-employee.component';
import {EmployeeComponent} from '../app/staff/employees/employee/employee.component';
import {TeamsComponent} from '../app/staff/teams/teams/teams.component';
import {TeamComponent} from '../app/staff/teams/team/team.component';
import {FormsModule} from '@angular/forms';
import {Role} from '../app/globals';
import {AddHolidayComponent} from '../app/staff/holidays/add-holiday/add-holiday.component';
import {HolidayService} from '../app/services/holiday.service';
import {TeamService} from '../app/services/team.service';
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
import {ComplaintsComponent} from '../app/shop/complaints/complaints/complaints.component';
import {ComplaintComponent} from '../app/shop/complaints/complaint/complaint.component';
import {ReturnsComponent} from '../app/shop/returns/returns/returns.component';
import {ReturnComponent} from '../app/shop/returns/return/return.component';
import {ComplaintService} from '../app/services/complaint.service';
import {ReturnService} from '../app/services/return.service';
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

const mockContractRequest = {
  accountNumber: '11111111111111111111111111',
  daysOffPerYear: 26,
  salary: 3000.00
};

const mockEmployees = [
  {
    id: 1,
    firstName: 'Ala',
    lastName: 'Makota',
    email: 'ala.makota@gmail.com',
    role: Role.ACCOUNTANT,
    password: 'aaa333aa',
    passwordValid: false,
    contract: mockContract
  },
  {
    id: 2,
    firstName: 'Ola',
    lastName: 'Mapsa',
    email: 'ola.mapsa@gmail.com',
    role: Role.ANALYST,
    password: 'ooo333oo',
    passwordValid: false,
    contract: mockContract
  }
];

const mockManagers = [
  {
    id: 1,
    firstName: 'Ala',
    lastName: 'Makota',
    email: 'ala.makota@gmail.com',
    role: Role.ADMIN_ACCOUNTANT,
    password: 'aaa333aa',
    passwordValid: false,
    contract: mockContract
  },
  {
    id: 2,
    firstName: 'Ola',
    lastName: 'Mapsa',
    email: 'ola.mapsa@gmail.com',
    role: Role.ADMIN_ANALYST,
    password: 'ooo333oo',
    passwordValid: false,
    contract: mockContract
  }
];

const employeeRequest = {
  firstName: 'Jola',
  lastName: 'Makanarka',
  email: 'jola.makanarka@gmail.com',
  role: Role.WAREHOUSE,
  contractRequest: mockContractRequest
};

describe('EmployeeService', () => {
  let service: EmployeeService;
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
        OrderService,
        NotificationService,
        SuggestionService,
        PlanningService,
        ComplaintService,
        ReturnService,
        EmailService
      ]
    });
    service = TestBed.get(EmployeeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchAllEmployees method', () => {
    describe('when called', () => {

      it('should hit "/employees" with GET and return employees', () => {
        service.fetchAllEmployees().subscribe(employees => {
          expect(employees.length).toBe(2);
          expect(employees).toEqual(mockEmployees);

          const req = httpMock.expectOne('http://localhost:8080/employees');
          expect(req.request.method).toBe('GET');
          req.flush(mockEmployees);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchColleagues method', () => {
    describe('when called', () => {

      it('should hit "/employees/colleagues" with GET and return employees', () => {
        service.fetchAllEmployees().subscribe(employees => {
          expect(employees.length).toBe(3);
          expect(employees).toEqual(mockEmployees);

          const req = httpMock.expectOne('http://localhost:8080/employees/colleagues');
          expect(req.request.method).toBe('GET');
          req.flush(mockEmployees);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchAllManagers method', () => {
    describe('when called', () => {

      it('should hit "/employees?privilege=admin" with GET and return managers', () => {
        service.fetchAllManagers().subscribe(managers => {
          expect(managers.length).toBe(2);
          expect(managers).toEqual(mockEmployees);

          const req = httpMock.expectOne('http://localhost:8080/employees?privilege=admin');
          expect(req.request.method).toBe('GET');
          req.flush(mockManagers);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchAllNonManagers method', () => {
    describe('when called', () => {

      it('should hit "/employees?privilege=user" with GET and return non-managers', () => {
        service.fetchAllNonManagers().subscribe(employees => {
          expect(employees.length).toBe(2);
          expect(employees).toEqual(mockEmployees);

          const req = httpMock.expectOne('http://localhost:8080/employees?privilege=user');
          expect(req.request.method).toBe('GET');
          req.flush(mockEmployees);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneEmployee method', () => {
    describe('when called', () => {

      it('should hit "/employees/1" with GET and return employee', () => {
        service.fetchOneEmployee(1).subscribe(employee => {
          expect(employee).toEqual(mockEmployees[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/employees/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockEmployees[0]);

        httpMock.verify();
      });
    });
  });

  describe('given addEmployee method', () => {
    describe('when called', () => {

      it('should hit "/employees/add" with POST', () => {
        service.addEmployee(employeeRequest).subscribe(() => {});

        const req = httpMock.expectOne('http://localhost:8080/employees');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given deleteEmployee method', () => {
    describe('when called', () => {

      it('should hit "/employees/2" with DELETE', () => {
        service.deleteEmployee(2);

        const req = httpMock.expectOne('http://localhost:8080/employees/2');
        expect(req.request.method).toBe('DELETE');

        httpMock.verify();
      });
    });
  });
});
