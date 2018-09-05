import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddItemComponent} from '../app/add-item/add-item.component';
import {DeliveryService} from '../app/delivery.service';
import {ItemService} from '../app/item.service';
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
import {AddDeliveryComponent} from '../app/add-delivery/add-delivery.component';
import {AddTaskComponent} from '../app/add-task/add-task.component';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {LoginComponent} from '../app/login/login.component';
import {ValidateComponent} from '../app/validate/validate.component';
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
import {ReturnComponent} from "../app/return/return.component";
import {ReturnsComponent} from "../app/returns/returns.component";
import {ComplaintComponent} from "../app/complaint/complaint.component";
import {ComplaintsComponent} from "../app/complaints/complaints.component";
import {ComplaintService} from "../app/complaint.service";
import {ReturnService} from "../app/return.service";
import {PlanningComponent} from "../app/planning/planning.component";
import {UpdateDailyPlanComponent} from "../app/update-daily-plan/update-daily-plan.component";
import {SpecialPlansComponent} from "../app/special-plans/special-plans.component";

describe('AddSuggestionComponent', () => {
  let component: AddSuggestionComponent;
  let fixture: ComponentFixture<AddSuggestionComponent>;
  let service: SuggestionService;

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
        ComplaintsComponent,
        ComplaintComponent,
        ReturnsComponent,
        ReturnComponent,
        PlanningComponent,
        UpdateDailyPlanComponent,
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
        ComplaintService,
        ReturnService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuggestionComponent);
    component = fixture.componentInstance;
    service = TestBed.get(SuggestionService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when form is submitted', () => {
    beforeEach(() => {
      spyOn(service, 'addSuggestion').and.callThrough();
      component.submitForm();
    });

    it('should call suggestionService.addSuggestion()', () => {
      expect(service.addSuggestion).toHaveBeenCalled();
    });
  });
});
