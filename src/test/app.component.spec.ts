import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from '../app/app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {TeamComponent} from '../app/team/team.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {EmployeeComponent} from '../app/employee/employee.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {FormsModule} from '@angular/forms';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {TasksComponent} from '../app/tasks/tasks.component';
import {TaskComponent} from '../app/task/task.component';
import {AddTaskComponent} from '../app/add-task/add-task.component';
import {ReportsComponent} from '../app/reports/reports.component';
import {ReportComponent} from '../app/report/report.component';
import {CurrentReportComponent} from '../app/current-report/current-report.component';
import {DeliveriesComponent} from '../app/deliveries/deliveries.component';
import {DeliveryComponent} from '../app/delivery/delivery.component';
import {ItemComponent} from '../app/item/item.component';
import {ItemsComponent} from '../app/items/items.component';
import {AddItemComponent} from '../app/add-item/add-item.component';
import {AddDeliveryComponent} from '../app/add-delivery/add-delivery.component';
import {LoginComponent} from '../app/login/login.component';
import {ValidateComponent} from '../app/validate/validate.component';
import {Token} from '../app/token';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SpecialPlansComponent} from '../app/special-plans/special-plans.component';
import {PlanningComponent} from '../app/planning/planning.component';
import {UpdateDailyPlanComponent} from '../app/update-daily-plan/update-daily-plan.component';
import {AddOrderComponent} from '../app/add-order/add-order.component';
import {AddNotificationComponent} from '../app/add-notification/add-notification.component';
import {AddSuggestionComponent} from '../app/add-suggestion/add-suggestion.component';
import {OrderComponent} from '../app/order/order.component';
import {OrdersComponent} from '../app/orders/orders.component';
import {NotificationComponent} from '../app/notification/notification.component';
import {NotificationsComponent} from '../app/notifications/notifications.component';
import {SuggestionComponent} from '../app/suggestion/suggestion.component';
import {SuggestionsComponent} from '../app/suggestions/suggestions.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes),
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
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
        SuggestionsComponent
      ],
      providers: [
        Token
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
