import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { PlanningComponent } from '../app/planning/planning.component';
import {PlanningService} from "../app/planning.service";
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {ReportService} from "../app/report.service";
import {TaskService} from "../app/task.service";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
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
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {ReturnService} from "../app/return.service";
import {ComplaintService} from "../app/complaint.service";
import {ReturnComponent} from "../app/return/return.component";
import {ReturnsComponent} from "../app/returns/returns.component";
import {ComplaintComponent} from "../app/complaint/complaint.component";
import {ComplaintsComponent} from "../app/complaints/complaints.component";
import {AddSuggestionComponent} from "../app/add-suggestion/add-suggestion.component";
import {AddNotificationComponent} from "../app/add-notification/add-notification.component";
import {AddOrderComponent} from "../app/add-order/add-order.component";
import {SuggestionsComponent} from "../app/suggestions/suggestions.component";
import {SuggestionComponent} from "../app/suggestion/suggestion.component";
import {NotificationsComponent} from "../app/notifications/notifications.component";
import {NotificationComponent} from "../app/notification/notification.component";
import {OrdersComponent} from "../app/orders/orders.component";
import {OrderComponent} from "../app/order/order.component";
import {ConversationComponent} from "../app/conversation/conversation.component";
import {AddEmailComponent} from "../app/add-email/add-email.component";
import {OutboxComponent} from "../app/outbox/outbox.component";
import {InboxComponent} from "../app/inbox/inbox.component";
import {EmailService} from "../app/email.service";

describe('PlanningComponent', () => {
  let component: PlanningComponent;
  let fixture: ComponentFixture<PlanningComponent>;
  let service: PlanningService;
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
        EmailService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PlanningService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call "fetchDailyPlan" method', () => {
    spyOn(component, 'fetchDailyPlan').and.callThrough();
    component.ngOnInit();
    expect(component.fetchDailyPlan).toHaveBeenCalled();
  });

  it('should call "fetchOrders" method', () => {
    spyOn(component, 'fetchOrders').and.callThrough();
    component.ngOnInit();
    expect(component.fetchOrders).toHaveBeenCalled();
  });

  describe('when "fetchDailyPlan" method is called', () => {
    beforeEach(() => {
     spyOn(service, 'fetchDailyPlan').and.callThrough();
     component.fetchDailyPlan();
    });

    it('should call planningService.fetchDailyPlan', () => {
      expect(service.fetchDailyPlan).toHaveBeenCalled();
    });
  });

  describe('when "fetchOrders" method is called', () => {
    beforeEach(() => {
      spyOn(component, 'fetchOrdersForDay').and.callThrough();
      component.fetchOrders();
    });

    it('should call "fetchOrdersForDay" three times', () => {
      expect(component.fetchOrdersForDay).toHaveBeenCalledTimes(3);
    });
  });

  describe('when "fetchOrdersForDay" method is called', () => {
    beforeEach(() => {
      spyOn(service, 'countScheduledOrders').and.callThrough();
      component.fetchOrdersForDay('today');
    });

    it('should call planningService.countScheduledOrders', () => {
      expect(service.countScheduledOrders).toHaveBeenCalled();
    });
  });

  describe('when "updateDailyPlan" method is called', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.callThrough();
    });

    it('should call router.navigate()', fakeAsync(() => {
      component.updateDailyPlan();
      expect(router.navigate).toHaveBeenCalled();
      tick(50);
      expect(location.path()).toBe('/planning/update');
    }));
  });
});
