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
import {ComplaintStatus, Resolution} from "../app/types";
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
          name: "przedmiot3",
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
