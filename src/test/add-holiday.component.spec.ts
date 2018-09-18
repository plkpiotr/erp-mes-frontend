import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddHolidayComponent} from '../app/staff/holidays/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/staff/employees/add-employee/add-employee.component';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {EmployeeComponent} from '../app/staff/employees/employee/employee.component';
import {EmployeesComponent} from '../app/staff/employees/employees/employees.component';
import {TeamComponent} from '../app/staff/teams/team/team.component';
import {TeamsComponent} from '../app/staff/teams/teams/teams.component';
import {EmployeeService} from '../app/services/employee.service';
import {HolidayService} from '../app/services/holiday.service';
import {TeamService} from '../app/services/team.service';
import {TasksComponent} from '../app/production/tasks/tasks/tasks.component';
import {TaskService} from '../app/services/task.service';
import {TaskComponent} from '../app/production/tasks/task/task.component';
import {AddTaskComponent} from '../app/production/tasks/add-task/add-task.component';
import {ReportService} from "../app/services/report.service";
import {ReportsComponent} from "../app/production/finance/reports/reports.component";
import {ReportComponent} from "../app/production/finance/report/report.component";
import {CurrentReportComponent} from "../app/production/finance/current-report/current-report.component";
import {DeliveryService} from "../app/services/delivery.service";
import {ItemService} from "../app/services/item.service";
import {DeliveriesComponent} from "../app/shop/deliveries/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/shop/deliveries/delivery/delivery.component";
import {ItemComponent} from "../app/shop/items/item/item.component";
import {ItemsComponent} from "../app/shop/items/items/items.component";
import {AddItemComponent} from "../app/shop/items/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/shop/deliveries/add-delivery/add-delivery.component";
import {LoginComponent} from "../app/security/login/login.component";
import {ValidateComponent} from "../app/security/validate/validate.component";
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
import {ReturnComponent} from "../app/shop/returns/return/return.component";
import {ReturnsComponent} from "../app/shop/returns/returns/returns.component";
import {ComplaintComponent} from "../app/shop/complaints/complaint/complaint.component";
import {ComplaintsComponent} from "../app/shop/complaints/complaints/complaints.component";
import {ComplaintService} from "../app/services/complaint.service";
import {ReturnService} from "../app/services/return.service";
import {SuggestionsComponent} from "../app/communication/suggestions/suggestions/suggestions.component";
import {ConversationComponent} from "../app/communication/emails/conversation/conversation.component";
import {AddEmailComponent} from "../app/communication/emails/add-email/add-email.component";
import {OutboxComponent} from "../app/communication/emails/outbox/outbox.component";
import {InboxComponent} from "../app/communication/emails/inbox/inbox.component";
import {EmailService} from "../app/services/email.service";

describe('AddHolidayComponent', () => {
  let component: AddHolidayComponent;
  let fixture: ComponentFixture<AddHolidayComponent>;
  let service: HolidayService;

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
        UpdateDailyPlanComponent,
        PlanningComponent,
        SpecialPlansComponent,
        OrderComponent,
        OrdersComponent,
        NotificationComponent,
        NotificationsComponent,
        SuggestionComponent,
        SuggestionsComponent,
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHolidayComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HolidayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when form is submitted', () => {
    beforeEach(() => {
      spyOn(service, 'addHoliday').and.callThrough();
      component.submitForm();
    });

    it('should call holidayService.addHoliday()', () => {
      expect(service.addHoliday).toHaveBeenCalled();
    });
  });
});
