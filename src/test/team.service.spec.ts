import {TestBed} from '@angular/core/testing';

import {TeamService} from '../app/team.service';
import {EmployeesComponent} from '../app/employees/employees.component';
import {EmployeeComponent} from '../app/employee/employee.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {FormsModule} from '@angular/forms';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TeamsComponent} from '../app/teams/teams.component';
import {TeamComponent} from '../app/team/team.component';
import {Role} from '../app/types';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {EmployeeService} from '../app/employee.service';
import {HolidayService} from '../app/holiday.service';
import {TasksComponent} from '../app/tasks/tasks.component';
import {TaskService} from '../app/task.service';
import {TaskComponent} from '../app/task/task.component';
import {AddTaskComponent} from '../app/add-task/add-task.component';
import {ReportService} from "../app/report.service";
import {ReportsComponent} from "../app/reports/reports.component";
import {ReportComponent} from "../app/report/report.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {ItemComponent} from "../app/item/item.component";
import {ItemsComponent} from "../app/items/items.component";
import {AddItemComponent} from "../app/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {LoginComponent} from "../app/login/login.component";
import {ValidateComponent} from "../app/validate/validate.component";
import {SpecialPlansComponent} from "../app/special-plans/special-plans.component";
import {PlanningComponent} from "../app/planning/planning.component";
import {UpdateDailyPlanComponent} from "../app/update-daily-plan/update-daily-plan.component";
import {PlanningService} from "../app/planning.service";
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
import {ComplaintService} from "../app/complaint.service";
import {ReturnComponent} from "../app/return/return.component";
import {ReturnsComponent} from "../app/returns/returns.component";
import {ComplaintComponent} from "../app/complaint/complaint.component";
import {ComplaintsComponent} from "../app/complaints/complaints.component";
import {ReturnService} from "../app/return.service";

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
        ReturnComponent
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
        SuggestionService
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
