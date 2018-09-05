import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ReturnsComponent } from '../app/returns/returns.component';
import {ReturnService} from "../app/return.service";
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
import {ComplaintComponent} from "../app/complaint/complaint.component";
import {ComplaintsComponent} from "../app/complaints/complaints.component";
import {LoginComponent} from "../app/login/login.component";
import {ValidateComponent} from "../app/validate/validate.component";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {SpecialPlansComponent} from "../app/special-plans/special-plans.component";
import {PlanningComponent} from "../app/planning/planning.component";
import {UpdateDailyPlanComponent} from "../app/update-daily-plan/update-daily-plan.component";
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
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
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

describe('ReturnsComponent', () => {
  let component: ReturnsComponent;
  let fixture: ComponentFixture<ReturnsComponent>;
  let service: ReturnService;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ReturnService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call returnService.fetchAllReturns()', () => {
    spyOn(component, 'fetchReturns').and.callThrough();
    spyOn(service, 'fetchAllReturns').and.callThrough();
    component.ngOnInit();
    expect(component.fetchReturns).toHaveBeenCalled();
    expect(service.fetchAllReturns).toHaveBeenCalled();
  });

  describe('When "Zobacz" button is clicked', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.callThrough();
    });

    it('should call router.navigate()', fakeAsync(() => {
      component.seeReturn(1);
      expect(router.navigate).toHaveBeenCalled();
      tick(50);
      expect(location.path()).toBe('/returns/1');
    }));
  });

  describe('When "Dodaj zwrot" button is clicked', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.callThrough();
    });

    it('should call router.navigate()', fakeAsync(() => {
      component.addReturn();
      expect(router.navigate).toHaveBeenCalled();
      tick(50);
      expect(location.path()).toBe('/shop-service/add?service=return');
    }));
  });
});
