import { TestBed, inject } from '@angular/core/testing';

import { ReturnService } from '../app/return.service';
import {ComplaintService} from "../app/complaint.service";
import {PlanningService} from "../app/planning.service";
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {ReportService} from "../app/report.service";
import {TaskService} from "../app/task.service";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
import {ReturnComponent} from "../app/return/return.component";
import {ReturnsComponent} from "../app/returns/returns.component";
import {ComplaintComponent} from "../app/complaint/complaint.component";
import {ComplaintsComponent} from "../app/complaints/complaints.component";
import {SpecialPlansComponent} from "../app/special-plans/special-plans.component";
import {PlanningComponent} from "../app/planning/planning.component";
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
import {ReturnStatus} from "../app/types";

const mockReturns = [
  {
    id: 1,
    status: ReturnStatus.ACCEPTED,
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
    value: 250
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
  scheduledFor: new Date('2018-09-03')
};

describe('ReturnService', () => {
  let service: ReturnService;
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
        AddSuggestionComponent
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
    service = TestBed.get(ReturnService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchAllReturns method', () => {
    describe('when called', () => {
      it('should hit "/returns" with GET and return returns', () => {
        service.fetchAllReturns().subscribe(r => {
          expect(r.length).toBe(1);
          expect(r).toEqual(mockReturns);

          const req = httpMock.expectOne('http://localhost:8080/returns');
          expect(req.request.method).toBe('GET');
          req.flush(mockReturns);
          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneReturn method', () => {
    describe('when called', () => {
      it('should hit "/returns/1" with GET and return return', () => {
        service.fetchOneReturn(1).subscribe(r => {
          expect(r).toEqual(mockReturns[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/returns/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockReturns[0]);
        httpMock.verify();
      });
    });
  });

  describe('given addOneReturn method', () => {
    describe('when called', () => {
      it('should hit "/shop-service/add" with POST', () => {
        service.addOneReturn(mockRequest).subscribe(() => {
        });
        const req = httpMock.expectOne('http://localhost:8080/returns');
        expect(req.request.method).toBe('POST');
        httpMock.verify();
      });
    });
  });

  describe('given updateReturnStatus method', () => {
    describe('when called', () => {
      it('should hit "/returns/1" with PUT', () => {
        service.updateReturnStatus(ReturnStatus.DECLINED.toString(), 1).subscribe(() => {
        });
        const req = httpMock.expectOne('http://localhost:8080/returns/1');
        expect(req.request.method).toBe('PUT');
        httpMock.verify();
      });
    });
  });
});
