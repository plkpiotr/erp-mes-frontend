import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { PlanningComponent } from '../app/production/planning/planning/planning.component';
import {PlanningService} from "../app/services/planning.service";
import {DeliveryService} from "../app/services/delivery.service";
import {ItemService} from "../app/services/item.service";
import {ReportService} from "../app/services/report.service";
import {TaskService} from "../app/services/task.service";
import {TeamService} from "../app/services/team.service";
import {HolidayService} from "../app/services/holiday.service";
import {EmployeeService} from "../app/services/employee.service";
import {SpecialPlansComponent} from "../app/production/planning/special-plans/special-plans.component";
import {UpdateDailyPlanComponent} from "../app/production/planning/update-daily-plan/update-daily-plan.component";
import {LoginComponent} from "../app/security/login/login.component";
import {ValidateComponent} from "../app/security/validate/validate.component";
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
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {ReturnService} from "../app/services/return.service";
import {ComplaintService} from "../app/services/complaint.service";
import {ReturnComponent} from "../app/shop/returns/return/return.component";
import {ReturnsComponent} from "../app/shop/returns/returns/returns.component";
import {ComplaintComponent} from "../app/shop/complaints/complaint/complaint.component";
import {ComplaintsComponent} from "../app/shop/complaints/complaints/complaints.component";
import {AddSuggestionComponent} from "../app/communication/suggestions/add-suggestion/add-suggestion.component";
import {AddNotificationComponent} from "../app/communication/notifications/add-notification/add-notification.component";
import {AddOrderComponent} from "../app/shop/orders/add-order/add-order.component";
import {SuggestionsComponent} from "../app/communication/suggestions/suggestions/suggestions.component";
import {SuggestionComponent} from "../app/communication/suggestions/suggestion/suggestion.component";
import {NotificationsComponent} from "../app/communication/notifications/notifications/notifications.component";
import {NotificationComponent} from "../app/communication/notifications/notification/notification.component";
import {OrdersComponent} from "../app/shop/orders/orders/orders.component";
import {OrderComponent} from "../app/shop/orders/order/order.component";
import {ConversationComponent} from "../app/communication/emails/conversation/conversation.component";
import {AddEmailComponent} from "../app/communication/emails/add-email/add-email.component";
import {OutboxComponent} from "../app/communication/emails/outbox/outbox.component";
import {InboxComponent} from "../app/communication/emails/inbox/inbox.component";
import {EmailService} from "../app/services/email.service";

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
