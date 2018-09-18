import {TestBed} from '@angular/core/testing';

import {ItemService} from '../app/services/item.service';
import {DeliveryService} from "../app/services/delivery.service";
import {ReportService} from "../app/services/report.service";
import {TaskService} from "../app/services/task.service";
import {TeamService} from "../app/services/team.service";
import {HolidayService} from "../app/services/holiday.service";
import {EmployeeService} from "../app/services/employee.service";
import {DeliveriesComponent} from "../app/shop/deliveries/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/shop/deliveries/delivery/delivery.component";
import {ItemComponent} from "../app/shop/items/item/item.component";
import {ItemsComponent} from "../app/shop/items/items/items.component";
import {ReportsComponent} from "../app/production/finance/reports/reports.component";
import {ReportComponent} from "../app/production/finance/report/report.component";
import {CurrentReportComponent} from "../app/production/finance/current-report/current-report.component";
import {TaskComponent} from "../app/production/tasks/task/task.component";
import {TasksComponent} from "../app/production/tasks/tasks/tasks.component";
import {TeamsComponent} from "../app/staff/teams/teams/teams.component";
import {TeamComponent} from "../app/staff/teams/team/team.component";
import {EmployeesComponent} from "../app/staff/employees/employees/employees.component";
import {EmployeeComponent} from "../app/staff/employees/employee/employee.component";
import {AddItemComponent} from "../app/shop/items/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/shop/deliveries/add-delivery/add-delivery.component";
import {AddTaskComponent} from "../app/production/tasks/add-task/add-task.component";
import {AddHolidayComponent} from "../app/staff/holidays/add-holiday/add-holiday.component";
import {AddEmployeeComponent} from "../app/staff/employees/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {ValidateComponent} from "../app/security/validate/validate.component";
import {LoginComponent} from "../app/security/login/login.component";
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

const mockItems = [
  {
    id: 2,
    name: 'przedmiot2',
    quantity: 5,
    stockPrice: 10,
    originalPrice: 20,
    currentPrice: 20
  },
  {
    id: 1,
    name: 'przedmiot1',
    quantity: 10,
    stockPrice: 10,
    originalPrice: 20,
    currentPrice: 20
  },
  {
    id: 3,
    name: 'przedmiot3',
    quantity: 25,
    stockPrice: 10,
    originalPrice: 20,
    currentPrice: 20
  }
];

const mockItemRequest = {
  name: 'przedmiot3',
  stockPrice: 10,
  price: 20,
};

describe('ItemService', () => {
  let service: ItemService;
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
        SpecialPlansComponent,
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
    service = TestBed.get(ItemService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchAllItems method', () => {
    describe('when called', () => {

      it('should hit "/items" with GET and return items', () => {
        service.fetchAllItems().subscribe(items => {
          expect(items.length).toBe(3);
          expect(items).toEqual(mockItems);

          const req = httpMock.expectOne('http://localhost:8080/items');
          expect(req.request.method).toBe('GET');
          req.flush(mockItems);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneItem method', () => {
    describe('when called', () => {

      it('should hit "/items/1" with GET and return items', () => {
        service.fetchOneItem(1).subscribe(item => {
          expect(item).toEqual(mockItems[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/items/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockItems[0]);

        httpMock.verify();
      });
    });
  });

  describe('given addNewItem method', () => {
    describe('when called', () => {

      it('should hit "/items/add" with POST', () => {
        service.addNewItem(mockItemRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/items');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given supplyItem method', () => {
    describe('when called', () => {

      it('should hit "/items/1/supply" with POST', () => {
        service.supplyItem(1, 10).subscribe(item => {
          expect(item).toEqual(mockItems[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/items/1/supply');
        expect(req.request.method).toBe('POST');
        req.flush(mockItems[0]);

        httpMock.verify();
      });
    });
  });

  describe('given buyItem method', () => {
    describe('when called', () => {

      it('should hit "/items/1/buy" with POST', () => {
        service.buyItem(1, 10).subscribe(item => {
          expect(item).toEqual(mockItems[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/items/1/buy');
        expect(req.request.method).toBe('POST');
        req.flush(mockItems[0]);

        httpMock.verify();
      });
    });
  });

  describe('given setSpecialOffer method', () => {
    describe('when called', () => {

      it('should hit "/set-special-offer" with POST', () => {
        service.setSpecialOffer('10', 'xd').subscribe(items => {
          expect(items).toEqual(mockItems);
        });

        const req = httpMock.expectOne('http://localhost:8080/set-special-offer?percentOff=10&query=xd');
        expect(req.request.method).toBe('POST');
        req.flush(mockItems);

        httpMock.verify();
      });
    });
  });

  describe('given cancelSpecialOffer method', () => {
    describe('when called', () => {

      it('should hit "/cancel-special-offer" with POST', () => {
        service.cancelSpecialOffer().subscribe(items => {
        });

        const req = httpMock.expectOne('http://localhost:8080/cancel-special-offer');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });
});
