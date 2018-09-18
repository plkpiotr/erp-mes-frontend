import {TestBed} from '@angular/core/testing';

import {ComplaintService} from '../app/complaint.service';
import {ReturnService} from "../app/return.service";
import {PlanningService} from "../app/planning.service";
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {ReportService} from "../app/report.service";
import {TaskService} from "../app/task.service";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
import {ReturnComponent} from "../app/return/return.component";
import {PlanningComponent} from "../app/planning/planning.component";
import {ReturnsComponent} from "../app/returns/returns.component";
import {ComplaintComponent} from "../app/complaint/complaint.component";
import {ComplaintsComponent} from "../app/complaints/complaints.component";
import {SpecialPlansComponent} from "../app/special-plans/special-plans.component";
import {UpdateDailyPlanComponent} from "../app/update-daily-plan/update-daily-plan.component";
import {LoginComponent} from "../app/login/login.component";
import {ValidateComponent} from "../app/validate/validate.component";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {ItemComponent} from "../app/item/item.component";
import {ItemsComponent} from "../app/items/items.component";
import {ReportsComponent} from "../app/reports/reports.component";
import {ReportComponent} from "../app/report/report.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {TaskComponent} from "../app/task/task.component";
import {TasksComponent} from "../app/tasks/tasks.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {TeamComponent} from "../app/team/team.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {AddItemComponent} from "../app/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {AddTaskComponent} from "../app/add-task/add-task.component";
import {AddHolidayComponent} from "../app/add-holiday/add-holiday.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {AddSuggestionComponent} from "../app/add-suggestion/add-suggestion.component";
import {AddNotificationComponent} from "../app/add-notification/add-notification.component";
import {AddOrderComponent} from "../app/add-order/add-order.component";
import {SuggestionsComponent} from "../app/suggestions/suggestions.component";
import {SuggestionComponent} from "../app/suggestion/suggestion.component";
import {NotificationsComponent} from "../app/notifications/notifications.component";
import {NotificationComponent} from "../app/notification/notification.component";
import {OrdersComponent} from "../app/orders/orders.component";
import {OrderComponent} from "../app/order/order.component";
import {OrderService} from "../app/order.service";
import {NotificationService} from "../app/notification.service";
import {SuggestionService} from "../app/suggestion.service";
import {ConversationComponent} from "../app/conversation/conversation.component";
import {AddEmailComponent} from "../app/add-email/add-email.component";
import {OutboxComponent} from "../app/outbox/outbox.component";
import {InboxComponent} from "../app/inbox/inbox.component";
import {EmailService} from "../app/email.service";
import {EmailType} from "../app/types";

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
