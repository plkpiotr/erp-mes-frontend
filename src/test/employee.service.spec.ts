import {TestBed} from '@angular/core/testing';

import {EmployeeService} from '../app/employee.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {EmployeesComponent} from '../app/employees/employees.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {EmployeeComponent} from '../app/employee/employee.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {TeamComponent} from '../app/team/team.component';
import {FormsModule} from '@angular/forms';
import {Role} from '../app/types';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {HolidayService} from '../app/holiday.service';
import {TeamService} from '../app/team.service';
import {TasksComponent} from '../app/tasks/tasks.component';
import {TaskService} from '../app/task.service';
import {TaskComponent} from '../app/task/task.component';
import {AddTaskComponent} from '../app/add-task/add-task.component';
import {ReportService} from '../app/report.service';
import {ReportsComponent} from '../app/reports/reports.component';
import {ReportComponent} from '../app/report/report.component';
import {CurrentReportComponent} from '../app/current-report/current-report.component';
import {DeliveryService} from '../app/delivery.service';
import {ItemService} from '../app/item.service';
import {DeliveriesComponent} from '../app/deliveries/deliveries.component';
import {DeliveryComponent} from '../app/delivery/delivery.component';
import {ItemComponent} from '../app/item/item.component';
import {ItemsComponent} from '../app/items/items.component';
import {AddItemComponent} from '../app/add-item/add-item.component';
import {AddDeliveryComponent} from '../app/add-delivery/add-delivery.component';
import {LoginComponent} from '../app/login/login.component';
import {ValidateComponent} from '../app/validate/validate.component';
import {SpecialPlansComponent} from '../app/special-plans/special-plans.component';
import {PlanningComponent} from '../app/planning/planning.component';
import {UpdateDailyPlanComponent} from '../app/update-daily-plan/update-daily-plan.component';
import {PlanningService} from '../app/planning.service';
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
        OrderService,
        NotificationService,
        SuggestionService,
        PlanningService
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
