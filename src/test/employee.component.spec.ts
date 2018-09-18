import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeComponent} from '../app/staff/employees/employee/employee.component';
import {EmployeeService} from '../app/services/employee.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {TeamComponent} from '../app/staff/teams/team/team.component';
import {EmployeesComponent} from '../app/staff/employees/employees/employees.component';
import {AddEmployeeComponent} from '../app/staff/employees/add-employee/add-employee.component';
import {TeamsComponent} from '../app/staff/teams/teams/teams.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {appRoutes} from '../app/app.routing';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../app/services/team.service';
import {HolidayService} from '../app/services/holiday.service';
import {AddHolidayComponent} from '../app/staff/holidays/add-holiday/add-holiday.component';
import {TasksComponent} from '../app/production/tasks/tasks/tasks.component';
import {TaskService} from '../app/services/task.service';
import {TaskComponent} from '../app/production/tasks/task/task.component';
import {AddTaskComponent} from '../app/production/tasks/add-task/add-task.component';
import {ReportsComponent} from "../app/production/finance/reports/reports.component";
import {ReportComponent} from "../app/production/finance/report/report.component";
import {CurrentReportComponent} from "../app/production/finance/current-report/current-report.component";
import {ReportService} from "../app/services/report.service";
import {DeliveryService} from "../app/services/delivery.service";
import {ItemService} from "../app/services/item.service";
import {DeliveriesComponent} from "../app/shop/deliveries/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/shop/deliveries/delivery/delivery.component";
import {ItemsComponent} from "../app/shop/items/items/items.component";
import {AddItemComponent} from "../app/shop/items/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/shop/deliveries/add-delivery/add-delivery.component";
import {ItemComponent} from "../app/shop/items/item/item.component";
import {LoginComponent} from "../app/security/login/login.component";
import {ValidateComponent} from "../app/security/validate/validate.component";
import {LoginService} from "../app/services/login.service";
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

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let service: EmployeeService;
  let loginService: LoginService;
  let holidayService: HolidayService;
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
        LoginService,
        OrderService,
        NotificationService,
        SuggestionService,
        EmailService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(EmployeeService);
    loginService = TestBed.get(LoginService);
    holidayService = TestBed.get(HolidayService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loginService.fetchUser()', () => {
    spyOn(loginService, 'fetchUser').and.callThrough();
    component.ngOnInit();
    expect(loginService.fetchUser).toHaveBeenCalled();
  });

  it('should load all necessary data', () => {
    component.ngOnInit();
    expect(component.isLoaded).toBeTruthy();
  });

  describe('when "Usuń pracownika" button is clicked', () => {
    beforeEach(() => {
      spyOn(service, 'deleteEmployee').and.callThrough();
    });

    it('should call employeeService.deleteEmployee', () => {
      component.deleteEmployee();
      expect(service.deleteEmployee).toHaveBeenCalledWith(route.snapshot.params['id']);
    });
  });

  describe('when "Zaakceptuj" button is clicked', () => {
    beforeEach(() => {
      spyOn(holidayService, 'manageHolidays').and.callThrough();
    });

    it('should call holidayService.manageHolidays() with approve=true' , () => {
      component.approve(1, 2);
      expect(holidayService.manageHolidays).toHaveBeenCalledWith(route.snapshot.params['id'], 2, 1, 'true');
    });
  });

  describe('when "Odrzuć" button is clicked', () => {
    beforeEach(() => {
      spyOn(holidayService, 'manageHolidays').and.callThrough();
    });

    it('should call holidayService.manageHolidays() ith approve=false' , () => {
      component.decline(1, 2);
      expect(holidayService.manageHolidays).toHaveBeenCalledWith(route.snapshot.params['id'], 2, 1, 'false');
    });
  });
});
