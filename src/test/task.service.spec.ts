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
import {Category, Role} from '../app/types';
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

const mockTasks = [
  {
    id: 1,
    name: 'Zapakować przesyłkę nr 1444',
    category: Category.TODO,
    assignee: {
      id: 1,
      firstName: 'Jakub',
      lastName: 'Kowalski',
      email: 'jakub.kowalski@domain.com',
      role: Role.ADMIN,
      password: 'wxqhwvde',
      contract: {
        id: 1,
        accountNumber: '75139348954923829450242727',
        daysOffPerYear: 26,
        salary: 2000.00
      },
      passwordValid: false
    },
    precedingTasks: [],
    details: 'Zmienić sposób dostarczenia na list priorytetowy',
    estimatedTimeInMinutes: 15,
    deadline: new Date('October 15, 2014 08:00:00'),
    creationTime: new Date('October 13, 2014 11:13:00'),
    startTime: null,
    endTime: null
  },
  {
    id: 2,
    name: 'Wysłać przesyłkę nr 1410',
    category: Category.TODO,
    assignee: {
      id: 2,
      firstName: 'Michał',
      lastName: 'Nowak',
      email: 'michal.nowak@domain.com',
      role: Role.ADMIN,
      password: 'wxqvvvde',
      contract: {
        id: 1,
        accountNumber: '75139348924923829450242727',
        daysOffPerYear: 26,
        salary: 2000.00
      },
      passwordValid: false
    },
    precedingTasks: [],
    details: 'Zmienić sposób dostarczenia na list priorytetowy',
    estimatedTimeInMinutes: 17,
    deadline: new Date('October 15, 2014 08:00:00'),
    creationTime: new Date('October 13, 2014 11:13:00'),
    startTime: null,
    endTime: null
  },
  {
    id: 3,
    name: 'Wysłać przesyłkę nr 1490',
    category: Category.TODO,
    assignee: {
      id: 1,
      firstName: 'Jakub',
      lastName: 'Kowalski',
      email: 'jakub.kowalski@domain.com',
      role: Role.ADMIN,
      password: 'wxqhwvde',
      contract: {
        id: 1,
        accountNumber: '75139348954923829450242727',
        daysOffPerYear: 26,
        salary: 2000.00
      },
      passwordValid: false
    },
    precedingTasks: [],
    details: 'Zmienić sposób dostarczenia na list ekonomiczny',
    estimatedTimeInMinutes: 19,
    deadline: new Date('October 15, 2014 08:00:00'),
    creationTime: new Date('October 13, 2014 11:13:00'),
    startTime: null,
    endTime: null
  },
  {
    id: 4,
    name: 'Wysłać przesyłkę nr 1429',
    category: Category.TODO,
    assignee: {
      id: 1,
      firstName: 'Jakub',
      lastName: 'Kowalski',
      email: 'jakub.kowalski@domain.com',
      role: Role.ADMIN,
      password: 'wxqhwvde',
      contract: {
        id: 1,
        accountNumber: '75139348954923829450242727',
        daysOffPerYear: 26,
        salary: 2000.00
      },
      passwordValid: false
    },
    precedingTasks: [
      {
        id: 1,
        name: 'Zapakować przesyłkę nr 1444',
        category: Category.TODO,
        assignee: {
          id: 1,
          firstName: 'Jakub',
          lastName: 'Kowalski',
          email: 'jakub.kowalski@domain.com',
          role: Role.ADMIN,
          password: 'wxqhwvde',
          contract: {
            id: 1,
            accountNumber: '75139348954923829450242727',
            daysOffPerYear: 26,
            salary: 2000.00
          },
          passwordValid: false
        },
        precedingTasks: [],
        details: 'Zmienić sposób dostarczenia na list priorytetowy',
        estimatedTimeInMinutes: 15,
        deadline: new Date('October 15, 2014 08:00:00'),
        creationTime: new Date('October 13, 2014 11:13:00'),
        startTime: null,
        endTime: null
      },
      {
        id: 2,
        name: 'Wysłać przesyłkę nr 1410',
        category: Category.TODO,
        assignee: {
          id: 1,
          firstName: 'Jakub',
          lastName: 'Kowalski',
          email: 'jakub.kowalski@domain.com',
          role: Role.ADMIN,
          password: 'wxqhwvde',
          contract: {
            id: 1,
            accountNumber: '75139348954923829450242727',
            daysOffPerYear: 26,
            salary: 2000.00
          },
          passwordValid: false
        },
        precedingTasks: [],
        details: 'Zmienić sposób dostarczenia na list priorytetowy',
        estimatedTimeInMinutes: 17,
        deadline: new Date('October 15, 2014 08:00:00'),
        creationTime: new Date('October 13, 2014 11:13:00'),
        startTime: null,
        endTime: null
      },
      {
        id: 3,
        name: 'Wysłać przesyłkę nr 1490',
        category: Category.TODO,
        assignee: {
          id: 1,
          firstName: 'Jakub',
          lastName: 'Kowalski',
          email: 'jakub.kowalski@domain.com',
          role: Role.ADMIN,
          password: 'wxqhwvde',
          contract: {
            id: 1,
            accountNumber: '75139348954923829450242727',
            daysOffPerYear: 26,
            salary: 2000.00
          },
          passwordValid: false
        },
        precedingTasks: [],
        details: 'Zmienić sposób dostarczenia na list ekonomiczny',
        estimatedTimeInMinutes: 19,
        deadline: new Date('October 15, 2014 08:00:00'),
        creationTime: new Date('October 13, 2014 11:13:00'),
        startTime: null,
        endTime: null
      }
    ],
    details: 'Nakleić informację: Uwaga! Szkło',
    estimatedTimeInMinutes: 13,
    deadline: new Date('October 15, 2014 08:00:00'),
    creationTime: new Date('October 13, 2014 11:13:00'),
    startTime: null,
    endTime: null
  }
];

describe('TaskService', () => {
  let service: TaskService;
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
    service = TestBed.get(TaskService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchAllTasks method', () => {
    describe('when called', () => {
      it('should hit "/tasks" with GET and return tasks', () => {
        service.fetchAllTasks().subscribe(tasks => {
          expect(tasks.length).toBe(4);
          expect(tasks).toEqual(mockTasks);
          const req = httpMock.expectOne('http://localhost:8080/tasks/');
          expect(req.request.method).toBe('GET');
          req.flush(mockTasks);
          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneTask method', () => {
    describe('when called', () => {
      it('should hit "tasks/1" with GET and return task', () => {
        service.fetchOneTask(1).subscribe(task => {
          expect(task).toEqual(mockTasks[0]);
        });
        const req = httpMock.expectOne('http://localhost:8080/tasks/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockTasks[0]);
        httpMock.verify();
      });
    });
  });

  describe('given fetchTasksByAssignee method', () => {
    describe('when called', () => {
      it('should hit "/employees/1/tasks" with GET and return tasks by assignee', () => {
        service.fetchTasksByAssignee(1).subscribe(tasks => {
          expect(tasks.length).toBe(3);
          expect(tasks).toEqual(mockTasks);
          const req = httpMock.expectOne('http://localhost:8080/employees/1/tasks');
          expect(req.request.method).toBe('GET');
          req.flush(mockTasks[0]);
          httpMock.verify();
        });
      });
    });
  });
});
