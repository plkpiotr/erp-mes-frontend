import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { ComplaintComponent } from '../app/shop/complaints/complaint/complaint.component';
import {ReturnService} from '../app/services/return.service';
import {ComplaintService} from '../app/services/complaint.service';
import {PlanningService} from '../app/services/planning.service';
import {DeliveryService} from '../app/services/delivery.service';
import {ItemService} from '../app/services/item.service';
import {ReportService} from '../app/services/report.service';
import {TaskService} from '../app/services/task.service';
import {TeamService} from '../app/services/team.service';
import {HolidayService} from '../app/services/holiday.service';
import {ReturnComponent} from '../app/shop/returns/return/return.component';
import {EmployeeService} from '../app/services/employee.service';
import {ReturnsComponent} from '../app/shop/returns/returns/returns.component';
import {ComplaintsComponent} from '../app/shop/complaints/complaints/complaints.component';
import {SpecialPlansComponent} from '../app/production/planning/special-plans/special-plans.component';
import {PlanningComponent} from '../app/production/planning/planning/planning.component';
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
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Resolution} from '../app/globals';
import {AddNotificationComponent} from '../app/communication/notifications/add-notification/add-notification.component';
import {AddSuggestionComponent} from '../app/communication/suggestions/add-suggestion/add-suggestion.component';
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
import {KanbanComponent} from '../app/production/tasks/kanban/kanban.component';
import {ComplaintStatus} from "../app/globals";

describe('ComplaintComponent', () => {
  let component: ComplaintComponent;
  let fixture: ComponentFixture<ComplaintComponent>;
  let service: ComplaintService;
  let route: ActivatedRoute;

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
        ConversationComponent,
        KanbanComponent
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ComplaintService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call complaintService.fetchOneComplaint', () => {
    spyOn(component, 'fetchComplaint').and.callThrough();
    spyOn(service, 'fetchOneComplaint').and.callThrough();
    component.ngOnInit();
    expect(component.fetchComplaint).toHaveBeenCalled();
    expect(service.fetchOneComplaint).toHaveBeenCalledWith(route.snapshot.params['id']);
  });

  describe('when "Zatwierdź" button is clicked', () => {
    beforeEach(() => {
      spyOn(service, 'updateComplaintStatus').and.callThrough();
    });

    it('should call complaintService.updateComplaintStatus', () => {
      component.status = ComplaintStatus.ACCEPTED;
      component.updateComplaintStatus();
      expect(service.updateComplaintStatus).toHaveBeenCalled();
    });
  });

  describe('when "Zatwierdź rozwiązanie" button is clicked', () => {
    beforeEach(() => {
      spyOn(service, 'updateComplaintResolution').and.callThrough();
    });

    it('complaintService.updateComplaintResolution', () => {
      component.resolution = Resolution.MONEY_RETURN;
      component.updateComplaintResolution();
      expect(service.updateComplaintResolution).toHaveBeenCalled();
    });
  });
});
