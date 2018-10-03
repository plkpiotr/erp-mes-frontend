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
import {Category, Role, Type} from '../app/types';
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
import {ReturnComponent} from '../app/shop/returns/return/return.component';
import {ReturnsComponent} from '../app/shop/returns/returns/returns.component';
import {ComplaintComponent} from '../app/shop/complaints/complaint/complaint.component';
import {ComplaintsComponent} from '../app/shop/complaints/complaints/complaints.component';
import {ComplaintService} from '../app/services/complaint.service';
import {ReturnService} from '../app/services/return.service';
import {PlanningComponent} from '../app/production/planning/planning/planning.component';
import {UpdateDailyPlanComponent} from '../app/production/planning/update-daily-plan/update-daily-plan.component';
import {SpecialPlansComponent} from '../app/production/planning/special-plans/special-plans.component';
import {EmailService} from '../app/services/email.service';
import {ConversationComponent} from '../app/communication/emails/conversation/conversation.component';
import {AddEmailComponent} from '../app/communication/emails/add-email/add-email.component';
import {OutboxComponent} from '../app/communication/emails/outbox/outbox.component';
import {InboxComponent} from '../app/communication/emails/inbox/inbox.component';

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
    estimatedTime: 15,
    deadline: new Date('October 15, 2014 08:00:00'),
    creationTime: new Date('October 13, 2014 11:13:00'),
    startTime: null,
    endTime: null,
    type: null,
    referenceId: null,
    scheduledTime: new Date('October 13, 2014 11:15:00')
  },
  {
    id: 2,
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
    estimatedTime: 19,
    deadline: new Date('October 15, 2014 08:00:00'),
    creationTime: new Date('October 13, 2014 11:13:00'),
    startTime: null,
    endTime: null,
    type: null,
    referenceId: null,
    scheduledTime: new Date('October 13, 2014 11:15:00')
  },
  {
    id: 3,
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
        estimatedTime: 15,
        deadline: new Date('October 15, 2014 08:00:00'),
        creationTime: new Date('October 13, 2014 11:13:00'),
        startTime: null,
        endTime: null,
        type: null,
        referenceId: null,
        scheduledTime: new Date('October 13, 2014 11:15:00')
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
        estimatedTime: 17,
        deadline: new Date('October 15, 2014 08:00:00'),
        creationTime: new Date('October 13, 2014 11:13:00'),
        startTime: null,
        endTime: null,
        type: null,
        referenceId: null,
        scheduledTime: new Date('October 13, 2014 11:15:00')
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
        estimatedTime: 19,
        deadline: new Date('October 15, 2014 08:00:00'),
        creationTime: new Date('October 13, 2014 11:13:00'),
        startTime: null,
        endTime: null,
        type: null,
        referenceId: null,
        scheduledTime: new Date('October 13, 2014 11:15:00')
      }
    ],
    details: 'Nakleić informację: Uwaga! Szkło',
    estimatedTime: 13,
    deadline: new Date('October 15, 2014 08:00:00'),
    creationTime: new Date('October 13, 2014 11:13:00'),
    startTime: null,
    endTime: null,
    type: null,
    referenceId: null,
    scheduledTime: new Date('October 13, 2014 11:15:00')
  },
  {
    id: 4,
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
    estimatedTime: 17,
    deadline: new Date('October 15, 2014 08:00:00'),
    creationTime: new Date('October 13, 2014 11:13:00'),
    startTime: null,
    endTime: null,
    type: null,
    referenceId: null,
    scheduledTime: new Date('October 13, 2014 11:15:00')
  }
];

const mockTaskRequest = {
  name: 'Wysłać przesyłkę nr 1951',
  category: Category.TODO,
  assigneeId: null,
  precedingTaskIds: [],
  details: 'Wykonać w pierwszej kolejności',
  estimatedTimeInMinutes: 8,
  deadline: new Date('October 19, 2014 07:00:00'),
  type: null,
  reference: null,
  scheduledTime: new Date('October 13, 2014 11:15:00')
};

describe('TaskService', () => {
  let taskService: TaskService;
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
        UpdateDailyPlanComponent,
        SpecialPlansComponent,
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
        ComplaintService,
        ReturnService,
        EmailService
      ]
    });
    taskService = TestBed.get(TaskService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  describe('given fetchAllTasks method', () => {
    describe('when called', () => {
      it('should hit "/tasks" with GET and return tasks', () => {
        taskService.fetchAllTasks().subscribe(tasks => {
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
        taskService.fetchOneTask(1).subscribe(task => {
          expect(task).toEqual(mockTasks[0]);
        });
        const req = httpMock.expectOne('http://localhost:8080/tasks/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockTasks[0]);
        httpMock.verify();
      });
    });
  });

  // describe('given fetchTasksByAssignee method', () => {
  //   describe('when called', () => {
  //     it('should hit "/employees/1/tasks" with GET and return tasks by assignee', () => {
  //       taskService.fetchTasksByAssignee(1).subscribe(tasks => {
  //         expect(tasks.length).toBe(3);
  //         const req = httpMock.expectOne('http://localhost:8080/employees/1/tasks');
  //         expect(req.request.method).toBe('GET');
  //         req.flush(mockTasks.slice(0, 3));
  //         httpMock.verify();
  //       });
  //     });
  //   });
  // });

  describe('given addTask method', () => {
    describe('when called', () => {
      it('should hit "/tasks/add" with POST', () => {
        taskService.addTask(mockTaskRequest).subscribe(() => {
        });
        const req = httpMock.expectOne('http://localhost:8080/tasks');
        expect(req.request.method).toBe('POST');
        httpMock.verify();
      });
    });
  });
});
