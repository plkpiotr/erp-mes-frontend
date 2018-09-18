import {TestBed} from '@angular/core/testing';

import {TeamService} from '../app/services/team.service';
import {EmployeesComponent} from '../app/staff/employees/employees/employees.component';
import {EmployeeComponent} from '../app/staff/employees/employee/employee.component';
import {AddEmployeeComponent} from '../app/staff/employees/add-employee/add-employee.component';
import {FormsModule} from '@angular/forms';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TeamsComponent} from '../app/staff/teams/teams/teams.component';
import {TeamComponent} from '../app/staff/teams/team/team.component';
import {Role} from '../app/types';
import {AddHolidayComponent} from '../app/staff/holidays/add-holiday/add-holiday.component';
import {EmployeeService} from '../app/services/employee.service';
import {HolidayService} from '../app/services/holiday.service';
import {TasksComponent} from '../app/production/tasks/tasks/tasks.component';
import {TaskService} from '../app/services/task.service';
import {TaskComponent} from '../app/production/tasks/task/task.component';
import {AddTaskComponent} from '../app/production/tasks/add-task/add-task.component';
import {ReportService} from "../app/services/report.service";
import {ReportsComponent} from "../app/production/finance/reports/reports.component";
import {ReportComponent} from "../app/production/finance/report/report.component";
import {CurrentReportComponent} from "../app/production/finance/current-report/current-report.component";
import {DeliveryService} from "../app/services/delivery.service";
import {ItemService} from "../app/services/item.service";
import {DeliveriesComponent} from "../app/shop/deliveries/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/shop/deliveries/delivery/delivery.component";
import {ItemComponent} from "../app/shop/items/item/item.component";
import {ItemsComponent} from "../app/shop/items/items/items.component";
import {AddItemComponent} from "../app/shop/items/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/shop/deliveries/add-delivery/add-delivery.component";
import {LoginComponent} from "../app/security/login/login.component";
import {ValidateComponent} from "../app/security/validate/validate.component";
import {SpecialPlansComponent} from "../app/production/planning/special-plans/special-plans.component";
import {PlanningComponent} from "../app/production/planning/planning/planning.component";
import {UpdateDailyPlanComponent} from "../app/production/planning/update-daily-plan/update-daily-plan.component";
import {PlanningService} from "../app/services/planning.service";
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
import {ComplaintService} from "../app/services/complaint.service";
import {ReturnComponent} from "../app/shop/returns/return/return.component";
import {ReturnsComponent} from "../app/shop/returns/returns/returns.component";
import {ComplaintComponent} from "../app/shop/complaints/complaint/complaint.component";
import {ComplaintsComponent} from "../app/shop/complaints/complaints/complaints.component";
import {ReturnService} from "../app/services/return.service";
import {ConversationComponent} from "../app/communication/emails/conversation/conversation.component";
import {AddEmailComponent} from "../app/communication/emails/add-email/add-email.component";
import {OutboxComponent} from "../app/communication/emails/outbox/outbox.component";
import {InboxComponent} from "../app/communication/emails/inbox/inbox.component";
import {EmailService} from "../app/services/email.service";

const mockContract = {
  id: 1,
  accountNumber: '11111111111111111111111111',
  daysOffPerYear: 26,
  salary: 3000.00
};

const mockTeams = [
  {
    id: 1,
    role: Role.ANALYST,
    manager: {
      id: 1,
      firstName: 'Ola',
      lastName: 'Mapsa',
      email: 'ola.mapsa@gmail.com',
      role: Role.ADMIN_ANALYST,
      password: 'ooo333oo',
      passwordValid: false,
      contract: mockContract
    },
    employees: [
      {
        id: 2,
        firstName: 'Ala',
        lastName: 'Makota',
        email: 'ala.makota@gmail.com',
        role: Role.ANALYST,
        password: 'aaa333aa',
        passwordValid: false,
        contract: mockContract
      },
      {
        id: 3,
        firstName: 'Ola',
        lastName: 'Niemapsa',
        email: 'ola.mapsa@gmail.com',
        role: Role.ANALYST,
        password: 'ooo333oo',
        passwordValid: false,
        contract: mockContract
      }
    ]
  },
  {
    id: 2,
    role: Role.ACCOUNTANT,
    manager: {
      id: 4,
      firstName: 'Ola',
      lastName: 'Mapsa',
      email: 'ola.mapsa@gmail.com',
      role: Role.ADMIN_ACCOUNTANT,
      password: 'ooo333oo',
      passwordValid: false,
      contract: mockContract
    },
    employees: [
      {
        id: 5,
        firstName: 'Ala',
        lastName: 'Makota',
        email: 'ala.makota@gmail.com',
        role: Role.ACCOUNTANT,
        password: 'aaa333aa',
        passwordValid: false,
        contract: mockContract
      },
      {
        id: 6,
        firstName: 'Ola',
        lastName: 'Niemapsa',
        email: 'ola.mapsa@gmail.com',
        role: Role.ACCOUNTANT,
        password: 'ooo333oo',
        passwordValid: false,
        contract: mockContract
      }
    ]
  }
];

describe('TeamService', () => {
  let service: TeamService;
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
        UpdateDailyPlanComponent,
        PlanningComponent,
        SpecialPlansComponent,
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
        OrderService,
        NotificationService,
        SuggestionService,
        EmailService
      ]
    });
    service = TestBed.get(TeamService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchAllTeams method', () => {
    describe('when called', () => {

      it('should hit "/teams" with GET and return teams', () => {
        service.fetchAllTeams().subscribe(teams => {
          expect(teams.length).toBe(2);
          expect(teams).toEqual(mockTeams);

          const req = httpMock.expectOne('http://localhost:8080/teams');
          expect(req.request.method).toBe('GET');
          req.flush(mockTeams);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneTeam method', () => {
    describe('when called', () => {

      it('should hit "/teams/1" with GET and return team', () => {
        service.fetchOneTeam(1).subscribe(team => {
          expect(team).toEqual(mockTeams[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/teams/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockTeams[0]);

        httpMock.verify();
      });
    });
  });
});
