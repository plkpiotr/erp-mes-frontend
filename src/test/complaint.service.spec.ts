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
import {ComplaintStatus, Resolution} from '../app/types';
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

const mockComplaints = [
  {
    id: 1,
    status: ComplaintStatus.ACCEPTED,
    requestedResolution: Resolution.MONEY_RETURN,
    resolution: Resolution.UNRESOLVED,
    firstName: 'Ala',
    lastName: 'Makota',
    email: 'ala.makota@gmail.com',
    street: 'Słoneczna',
    houseNumber: '46',
    city: 'Krosno',
    postalCode: '38-400',
    deliveryItems: [
      {
        id: 3,
        item: {
          id: 3,
          name: 'przedmiot3',
          quantity: 25,
          stockPrice: 10,
          originalPrice: 20,
          currentPrice: 20
        },
        quantity: 25
      }
    ],
    scheduledFor: new Date('2018-08-15'),
    value: 250,
    fault: 'Broken'
  }
];

const mockRequest = {
  firstName: 'Jan',
  lastName: 'Krauze',
  email: 'jan@krauze.pl',
  phoneNumber: null,
  street: 'ul. Armii Krajowej',
  houseNumber: '225',
  city: 'Wisła',
  postalCode: '77-106',
  deliveryItemRequests: [
    {
      itemId: 3,
      quantity: 25
    }
  ],
  scheduledFor: new Date('2018-09-03'),
  requestedResolution: Resolution.MONEY_RETURN,
  fault: 'Broken'
};

describe('ComplaintService', () => {
  let service: ComplaintService;
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
    service = TestBed.get(ComplaintService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchAllComplaints method', () => {
    describe('when called', () => {
      it('should hit "/complaints" with GET and return complaints', () => {
        service.fetchAllComplaints().subscribe(complaint => {
          expect(complaint.length).toBe(1);
          expect(complaint).toEqual(mockComplaints);

          const req = httpMock.expectOne('http://localhost:8080/complaints');
          expect(req.request.method).toBe('GET');
          req.flush(mockComplaints);
          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneComplaint method', () => {
    describe('when called', () => {
      it('should hit "/complaints/1" with GET and return complaint', () => {
        service.fetchOneComplaint(1).subscribe(complaint => {
          expect(complaint).toEqual(mockComplaints[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/complaints/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockComplaints[0]);
        httpMock.verify();
      });
    });
  });

  describe('given addOneComplaint method', () => {
    describe('when called', () => {
      it('should hit "/shop-service/add" with POST', () => {
        service.addOneComplaint(mockRequest).subscribe(() => {
        });
        const req = httpMock.expectOne('http://localhost:8080/complaints');
        expect(req.request.method).toBe('POST');
        httpMock.verify();
      });
    });
  });

  describe('given updateComplaintStatus method', () => {
    describe('when called', () => {
      it('should hit "/complaints/1" with PUT', () => {
        service.updateComplaintStatus(ComplaintStatus.DECLINED.toString(), 1).subscribe(() => {
        });
        const req = httpMock.expectOne('http://localhost:8080/complaints/1');
        expect(req.request.method).toBe('PUT');
        httpMock.verify();
      });
    });
  });

  describe('given updateComplaintResolution method', () => {
    describe('when called', () => {
      it('should hit "/complaints/1/resolution" with PUT', () => {
        service.updateComplaintResolution(Resolution.REPAIR.toString(), 1).subscribe(() => {
        });
        const req = httpMock.expectOne('http://localhost:8080/complaints/1/resolution');
        expect(req.request.method).toBe('PUT');
        httpMock.verify();
      });
    });
  });
});
