import {inject, TestBed} from '@angular/core/testing';

import {ReportService} from '../app/services/report.service';
import {TaskService} from "../app/services/task.service";
import {TeamService} from "../app/services/team.service";
import {HolidayService} from "../app/services/holiday.service";
import {EmployeeService} from "../app/services/employee.service";
import {ReportsComponent} from "../app/production/finance/reports/reports.component";
import {EmployeesComponent} from "../app/staff/employees/employees/employees.component";
import {EmployeeComponent} from "../app/staff/employees/employee/employee.component";
import {AddTaskComponent} from "../app/production/tasks/add-task/add-task.component";
import {AddHolidayComponent} from "../app/staff/holidays/add-holiday/add-holiday.component";
import {AddEmployeeComponent} from "../app/staff/employees/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {TeamComponent} from "../app/staff/teams/team/team.component";
import {TeamsComponent} from "../app/staff/teams/teams/teams.component";
import {TasksComponent} from "../app/production/tasks/tasks/tasks.component";
import {TaskComponent} from "../app/production/tasks/task/task.component";
import {CurrentReportComponent} from "../app/production/finance/current-report/current-report.component";
import {ReportComponent} from "../app/production/finance/report/report.component";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ExpenseType} from "../app/types";
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
import {ReturnService} from "../app/services/return.service";
import {ComplaintService} from "../app/services/complaint.service";
import {ReturnComponent} from "../app/shop/returns/return/return.component";
import {ReturnsComponent} from "../app/shop/returns/returns/returns.component";
import {ComplaintComponent} from "../app/shop/complaints/complaint/complaint.component";
import {ComplaintsComponent} from "../app/shop/complaints/complaints/complaints.component";
import {ConversationComponent} from "../app/communication/emails/conversation/conversation.component";
import {AddEmailComponent} from "../app/communication/emails/add-email/add-email.component";
import {OutboxComponent} from "../app/communication/emails/outbox/outbox.component";
import {InboxComponent} from "../app/communication/emails/inbox/inbox.component";
import {EmailService} from "../app/services/email.service";

const mockEstimatedCosts = {
  id: 1,
  estimatedIncome: 175000,
  estimatedShippingCosts: 5000,
  estimatedBills: 3000,
  rent: 10000,
  salaries: 100000,
  stockCosts: 30000,
  socialFund: 2000,
  unexpected: 5000,
  taxes: 55000
};

const mockEstimatedCostsRequest = {
  estimatedIncome: 175000,
  estimatedShippingCosts: 5000,
  estimatedBills: 3000,
  rent: 10000,
  salaries: 100000,
  stockCosts: 30000,
  socialFund: 2000,
  unexpected: 5000,
};

const mockExpenses = [
  {
    id: 1,
    expenseType: ExpenseType.SALARIES,
    amount: 120000
  },
  {
    id: 2,
    expenseType: ExpenseType.SALARIES,
    amount: 120000
  }
];

const mockExpenseRequest = {
  expenseType: ExpenseType.SALARIES,
  amount: 120000
};

const mockReports = [
  {
    id: 1,
    expenses: mockExpenses,
    income: [],
    startDate: new Date('2018-02-01'),
    overallExpenses: 120000,
    overallIncome: 50000,
    balance: -70000,
    estimatedCosts: mockEstimatedCosts
  },
  {
    id: 2,
    expenses: mockExpenses,
    income: [],
    startDate: new Date('2018-03-01'),
    overallExpenses: 120000,
    overallIncome: 50000,
    balance: -70000,
    estimatedCosts: mockEstimatedCosts
  },
  {
    id: 3,
    expenses: mockExpenses,
    income: [],
    startDate: new Date('2018-04-01'),
    overallExpenses: 120000,
    overallIncome: 50000,
    balance: -70000,
    estimatedCosts: mockEstimatedCosts
  },
  {
    id: 4,
    expenses: mockExpenses,
    income: [],
    startDate: new Date('2018-05-01'),
    overallExpenses: 120000,
    overallIncome: 50000,
    balance: -70000,
    estimatedCosts: mockEstimatedCosts
  }
];

const mockCurrentReport = {
  id: 1,
  expenses: mockExpenses,
  income: [],
  estimatedCosts: mockEstimatedCosts,
  startDate: new Date('2018-08-14')
};

let service: ReportService;
let httpMock: HttpTestingController;

describe('ReportService', () => {
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
        ComplaintService,
        ReturnService,
        PlanningService,
        OrderService,
        NotificationService,
        SuggestionService,
        EmailService
      ]
    });
    service = TestBed.get(ReportService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ReportService], () => {
    expect(service).toBeTruthy();
  }));

  describe('given fetchAllReports method', () => {
    describe('when called', () => {

      it('should hit "/reports" with GET and return reports', () => {
        service.fetchAllReports().subscribe(reports => {
          expect(reports.length).toBe(4);
          expect(reports).toEqual(mockReports);

          const req = httpMock.expectOne('http://localhost:8080/reports');
          expect(req.request.method).toBe('GET');
          req.flush(mockReports);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneReport method', () => {
    describe('when called', () => {

      it('should hit "/reports/1" with GET and return report', () => {
        service.fetchOneReport(1).subscribe(report => {
          expect(report).toEqual(mockReports[0]);

          const req = httpMock.expectOne('http://localhost:8080/reports/1');
          expect(req.request.method).toBe('GET');
          req.flush(mockReports[0]);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchCurrentReport method', () => {
    describe('when called', () => {

      it('should hit "/current-report" with GET and return current report', () => {
        service.fetchCurrentReport().subscribe(report => {
          expect(report).toEqual(mockCurrentReport);

          const req = httpMock.expectOne('http://localhost:8080/current-report');
          expect(req.request.method).toBe('GET');
          req.flush(mockCurrentReport);

          httpMock.verify();
        });
      });
    });
  });

  describe('given recalculateCosts method', () => {
    describe('when called', () => {

      it('should hit "/current-report" with PUT', () => {
        service.recalculateCosts(mockEstimatedCostsRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/current-report');
        expect(req.request.method).toBe('PUT');

        httpMock.verify();
      });
    });
  });

  describe('given addIncome method', () => {
    describe('when called', () => {

      it('should hit "/current-report/income" with POST', () => {
        service.addIncome(500.00).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/current-report/income');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given addExpense method', () => {
    describe('when called', () => {

      it('should hit "/current-report/income" with POST', () => {
        service.addExpense(mockExpenseRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/current-report/expense');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given fetchRecommendations method', () => {
    describe('when called', () => {

      it('should hit "/current-report/recommended-recalculations" with GET', () => {
        service.fetchRecommendations().subscribe(est => {
          expect(est).toEqual(mockEstimatedCosts);
        });

        const req = httpMock.expectOne('http://localhost:8080/current-report/recommended-recalculations');
        expect(req.request.method).toBe('GET');
        req.flush(mockEstimatedCosts);

        httpMock.verify();
      });
    });
  });
});
