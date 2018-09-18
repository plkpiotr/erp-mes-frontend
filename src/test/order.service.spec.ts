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
import {Status} from '../app/types';
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
import {ReturnService} from '../app/services/return.service';
import {ComplaintService} from '../app/services/complaint.service';
import {PlanningComponent} from '../app/production/planning/planning/planning.component';
import {UpdateDailyPlanComponent} from '../app/production/planning/update-daily-plan/update-daily-plan.component';
import {SpecialPlansComponent} from '../app/production/planning/special-plans/special-plans.component';
import {ConversationComponent} from '../app/communication/emails/conversation/conversation.component';
import {AddEmailComponent} from '../app/communication/emails/add-email/add-email.component';
import {OutboxComponent} from '../app/communication/emails/outbox/outbox.component';
import {InboxComponent} from '../app/communication/emails/inbox/inbox.component';
import {EmailService} from '../app/services/email.service';

const mockOrders = [
  {
    id: 1,
    status: Status.WAITING_FOR_PAYMENT,
    firstName: 'Piotr',
    lastName: 'Piątek',
    email: 'piotr@piatek.pl',
    phoneNumber: null,
    street: 'ul. Łukasza Cieplińskiego',
    houseNumber: '44a',
    city: 'Piotrków Trybunalski',
    postalCode: '19-402',
    deliveryItems: [
      {
        id: 1,
        item: {
          id: 1,
          name: 'Piłka',
          quantity: 2,
          stockPrice: 5,
          originalPrice: 5,
          currentPrice: 7
        },
        quantity: 8
      },
      {
        id: 2,
        item: {
          id: 2,
          name: 'Zabawka',
          quantity: 1,
          stockPrice: 25,
          originalPrice: 26,
          currentPrice: 27
        },
        quantity: 1
      }
    ],
    scheduledFor: new Date('2018-09-03'),
    value: 105
  },
  {
    id: 2,
    status: Status.WAITING_FOR_PAYMENT,
    firstName: 'Katarzyna',
    lastName: 'Tracz',
    email: 'katarzyna@tracz.pl',
    phoneNumber: '312209232',
    street: 'ul. Fiodora Dostojewskiego',
    houseNumber: '2',
    city: 'Chorzów',
    postalCode: '43-120',
    deliveryItems: [
      {
        id: 3,
        item: {
          id: 3,
          name: 'Maskotka',
          quantity: 25,
          stockPrice: 10,
          originalPrice: 20,
          currentPrice: 20
        },
        quantity: 25
      }
    ],
    scheduledFor: new Date('2018-09-03'),
    value: 250
  }
];

const mockDeliveryItemRequest = {
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
  scheduledFor: new Date('2018-09-03')
};

describe('OrderService', () => {
  let orderService: OrderService;
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
        UpdateDailyPlanComponent,
        SpecialPlansComponent,
        PlanningComponent,
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
        ReturnService,
        ComplaintService,
        EmailService
      ]
    });
    orderService = TestBed.get(OrderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(orderService).toBeTruthy();
  });

  describe('given fetchAllOrders method', () => {
    describe('when called', () => {
      it('should hit "/orders" with GET and return orders', () => {
        orderService.fetchAllOrders().subscribe(orders => {
          expect(orders.length).toBe(2);
          expect(orders).toEqual(mockOrders);
          const req = httpMock.expectOne('http://localhost:8080/orders');
          expect(req.request.method).toBe('GET');
          req.flush(mockOrders);
          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneOrder method', () => {
    describe('when called', () => {
      it('should hit "/orders/1" with GET and return order', () => {
        orderService.fetchOneOrder(1).subscribe(order => {
          expect(order).toEqual(mockOrders[0]);
        });
        const req = httpMock.expectOne('http://localhost:8080/orders/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockOrders[0]);
        httpMock.verify();
      });
    });
  });

  describe('given addOneOrder method', () => {
    describe('when called', () => {
      it('should hit "/orders/add" with POST', () => {
        orderService.addOneOrder(mockDeliveryItemRequest).subscribe(() => {
        });
        const req = httpMock.expectOne('http://localhost:8080/orders');
        expect(req.request.method).toBe('POST');
        httpMock.verify();
      });
    });
  });
});
