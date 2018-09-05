import {TestBed} from '@angular/core/testing';

import {ItemService} from '../app/item.service';
import {DeliveryService} from '../app/delivery.service';
import {ReportService} from '../app/report.service';
import {TaskService} from '../app/task.service';
import {TeamService} from '../app/team.service';
import {HolidayService} from '../app/holiday.service';
import {EmployeeService} from '../app/employee.service';
import {DeliveriesComponent} from '../app/deliveries/deliveries.component';
import {DeliveryComponent} from '../app/delivery/delivery.component';
import {ItemComponent} from '../app/item/item.component';
import {ItemsComponent} from '../app/items/items.component';
import {ReportsComponent} from '../app/reports/reports.component';
import {ReportComponent} from '../app/report/report.component';
import {CurrentReportComponent} from '../app/current-report/current-report.component';
import {TaskComponent} from '../app/task/task.component';
import {TasksComponent} from '../app/tasks/tasks.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {TeamComponent} from '../app/team/team.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {EmployeeComponent} from '../app/employee/employee.component';
import {AddItemComponent} from '../app/add-item/add-item.component';
import {AddDeliveryComponent} from '../app/add-delivery/add-delivery.component';
import {AddTaskComponent} from '../app/add-task/add-task.component';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {ValidateComponent} from '../app/validate/validate.component';
import {LoginComponent} from '../app/login/login.component';
import {SpecialPlansComponent} from '../app/special-plans/special-plans.component';
import {PlanningComponent} from '../app/planning/planning.component';
import {UpdateDailyPlanComponent} from '../app/update-daily-plan/update-daily-plan.component';
import {PlanningService} from '../app/planning.service';
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
        SpecialPlansComponent
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
        PlanningService
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
