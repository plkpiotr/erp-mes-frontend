import {TestBed} from '@angular/core/testing';

import {ComplaintService} from '../app/services/complaint.service';
import {ReturnService} from '../app/services/return.service';
import {PlanningService} from '../app/services/planning.service';
import {DeliveryService} from '../app/services/delivery.service';
import {ItemService} from '../app/services/item.service';
import {ReportService} from '../app/services/report.service';
import {TaskService} from '../app/services/task.service';
import {TeamService} from '../app/services/team.service';
import {HolidayService} from '../app/services/holiday.service';
import {EmployeeService} from '../app/services/employee.service';
import {ReturnComponent} from '../app/shop/returns/return/return.component';
import {PlanningComponent} from '../app/production/planning/planning/planning.component';
import {ReturnsComponent} from '../app/shop/returns/returns/returns.component';
import {ComplaintComponent} from '../app/shop/complaints/complaint/complaint.component';
import {ComplaintsComponent} from '../app/shop/complaints/complaints/complaints.component';
import {SpecialPlansComponent} from '../app/production/planning/special-plans/special-plans.component';
import {UpdateDailyPlanComponent} from '../app/production/planning/update-daily-plan/update-daily-plan.component';
import {LoginComponent} from '../app/security/login/login.component';
import {ValidateComponent} from '../app/security/validate/validate.component';
import {DeliveriesComponent} from '../app/shop/deliveries/deliveries/deliveries.component';
import {DeliveryComponent} from '../app/shop/deliveries/delivery/delivery.component';
import {ItemComponent} from '../app/shop/items/item/item.component';
import {ItemsComponent} from '../app/shop/items/items/items.component';
import {ReportsComponent} from '../app/production/finance/reports/reports.component';
import {ReportComponent} from '../app/production/finance/report/report.component';
import {CurrentReportComponent} from '../app/production/finance/current-report/current-report.component';
import {TaskComponent} from '../app/production/tasks/task/task.component';
import {TasksComponent} from '../app/production/tasks/tasks/tasks.component';
import {TeamsComponent} from '../app/staff/teams/teams/teams.component';
import {TeamComponent} from '../app/staff/teams/team/team.component';
import {EmployeesComponent} from '../app/staff/employees/employees/employees.component';
import {EmployeeComponent} from '../app/staff/employees/employee/employee.component';
import {AddItemComponent} from '../app/shop/items/add-item/add-item.component';
import {AddDeliveryComponent} from '../app/shop/deliveries/add-delivery/add-delivery.component';
import {AddTaskComponent} from '../app/production/tasks/add-task/add-task.component';
import {AddHolidayComponent} from '../app/staff/holidays/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/staff/employees/add-employee/add-employee.component';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {AddSuggestionComponent} from '../app/communication/suggestions/add-suggestion/add-suggestion.component';
import {AddNotificationComponent} from '../app/communication/notifications/add-notification/add-notification.component';
import {AddOrderComponent} from '../app/shop/orders/add-order/add-order.component';
import {SuggestionsComponent} from '../app/communication/suggestions/suggestions/suggestions.component';
import {SuggestionComponent} from '../app/communication/suggestions/suggestion/suggestion.component';
import {NotificationsComponent} from '../app/communication/notifications/notifications/notifications.component';
import {NotificationComponent} from '../app/communication/notifications/notification/notification.component';
import {OrdersComponent} from '../app/shop/orders/orders/orders.component';
import {OrderComponent} from '../app/shop/orders/order/order.component';
import {OrderService} from '../app/services/order.service';
import {NotificationService} from '../app/services/notification.service';
import {SuggestionService} from '../app/services/suggestion.service';
import {ConversationComponent} from '../app/communication/emails/conversation/conversation.component';
import {AddEmailComponent} from '../app/communication/emails/add-email/add-email.component';
import {OutboxComponent} from '../app/communication/emails/outbox/outbox.component';
import {InboxComponent} from '../app/communication/emails/inbox/inbox.component';
import {EmailService} from '../app/services/email.service';
import {EmailType} from '../app/types';
import {KanbanComponent} from '../app/production/tasks/kanban/kanban.component';

const mockEmails = [
  {
    id: 1,
    email: 'ala@ala.ala',
    subject: 'Random subject',
    content: [
      'Random',
      'content'
    ],
    emailType: EmailType.RECEIVED,
    timestamp:  new Date('December 30, 2016 07:25:00')
  },
  {
    id: 2,
    email: 'ala@ala.ala',
    subject: 'Random subject',
    content: [
      'Random',
      'content'
    ],
    emailType: EmailType.RECEIVED,
    timestamp:  new Date('December 30, 2016 07:30:00')
  },
  {
    id: 3,
    email: 'ala@ala.ala',
    subject: 'Random subject',
    content: [
      'Random',
      'content'
    ],
    emailType: EmailType.RECEIVED,
    timestamp:  new Date('December 30, 2016 07:45:00')
  }
];

const mockNoAddressRequest = {
  subject: 'Random subject',
  content: [
    'Random',
    'content'
  ]
};

const mockRequest = {
  email: 'ala@ala.ala',
  subject: 'Random subject',
  content: [
    'Random',
    'content'
  ]
};

describe('EmailService', () => {
  let service: EmailService;
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
        ComplaintsComponent,
        ComplaintComponent,
        ReturnsComponent,
        ReturnComponent,
        OrderComponent,
        OrdersComponent,
        NotificationComponent,
        NotificationsComponent,
        SuggestionComponent,
        SuggestionsComponent,
        AddOrderComponent,
        AddNotificationComponent,
        AddSuggestionComponent,
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
        ComplaintService,
        ReturnService,
        OrderService,
        NotificationService,
        SuggestionService,
        EmailService
      ]
    });
    service = TestBed.get(EmailService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchReceivedEmails method', () => {
    describe('when called', () => {

      it('should hit "/emails/inbox" with GET and return received emails', () => {
        service.fetchReceivedEmails().subscribe(emails => {
          expect(emails.length).toBe(3);
          expect(emails).toEqual(mockEmails);

          const req = httpMock.expectOne('http://localhost:8080/emails/inbox');
          expect(req.request.method).toBe('GET');
          req.flush(mockEmails);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchSentEmails method', () => {
    describe('when called', () => {

      it('should hit "/emails/outbox" with GET and return sent emails', () => {
        service.fetchSentEmails().subscribe(emails => {
          expect(emails.length).toBe(3);
          expect(emails).toEqual(mockEmails);

          const req = httpMock.expectOne('http://localhost:8080/emails/outbox');
          expect(req.request.method).toBe('GET');
          req.flush(mockEmails);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchConversation method', () => {
    describe('when called', () => {

      it('should hit "/emails/1" with GET and return conversation', () => {
        service.fetchConversation(1).subscribe(emails => {
          expect(emails.length).toBe(3);
          expect(emails).toEqual(mockEmails);

          const req = httpMock.expectOne('http://localhost:8080/emails/1');
          expect(req.request.method).toBe('GET');
          req.flush(mockEmails);

          httpMock.verify();
        });
      });
    });
  });

  describe('given sendEmail method', () => {
    describe('when called', () => {

      it('should hit "/emails" with POST', () => {
        service.sendEmail(mockRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/emails');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given reply method', () => {
    describe('when called', () => {

      it('should hit "/emails/1" with POST', () => {
        service.reply(mockNoAddressRequest, 1).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/emails/1');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given removeMessage method', () => {
    describe('when called', () => {

      it('should hit "/emails/2" with DELETE', () => {
        service.removeMessage(2);

        const req = httpMock.expectOne('http://localhost:8080/emails/2');
        expect(req.request.method).toBe('DELETE');

        httpMock.verify();
      });
    });
  });
});
