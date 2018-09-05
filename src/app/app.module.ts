import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {routing} from './app.routing';
import {EmployeesComponent} from './employees/employees.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {EmployeeComponent} from './employee/employee.component';
import {EmployeeService} from './employee.service';
import {TeamsComponent} from './teams/teams.component';
import {TeamComponent} from './team/team.component';
import {TeamService} from './team.service';
import {AddHolidayComponent} from './add-holiday/add-holiday.component';
import {HolidayService} from './holiday.service';
import {AddTaskComponent} from './add-task/add-task.component';
import {TaskComponent} from './task/task.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskService} from './task.service';
import {ReportService} from './report.service';
import {ReportsComponent} from './reports/reports.component';
import {ReportComponent} from './report/report.component';
import {CurrentReportComponent} from './current-report/current-report.component';
import {ItemService} from './item.service';
import {DeliveryService} from './delivery.service';
import {ItemsComponent} from './items/items.component';
import {ItemComponent} from './item/item.component';
import {AddItemComponent} from './add-item/add-item.component';
import {DeliveriesComponent} from './deliveries/deliveries.component';
import {DeliveryComponent} from './delivery/delivery.component';
import {AddDeliveryComponent} from './add-delivery/add-delivery.component';
import {LoginComponent} from './login/login.component';
import {LoginService} from './login.service';
import {Token} from './token';
import {Interceptor} from './interceptor';
import {ValidateComponent} from './validate/validate.component';
import {PlanningComponent} from './planning/planning.component';
import {SpecialPlansComponent} from './special-plans/special-plans.component';
import {PlanningService} from './planning.service';
import {UpdateDailyPlanComponent} from './update-daily-plan/update-daily-plan.component';
import {AddOrderComponent} from './add-order/add-order.component';
import {AddSuggestionComponent} from './add-suggestion/add-suggestion.component';
import {AddNotificationComponent} from './add-notification/add-notification.component';
import {OrderComponent} from './order/order.component';
import {OrdersComponent} from './orders/orders.component';
import {NotificationComponent} from './notification/notification.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {SuggestionComponent} from './suggestion/suggestion.component';
import {SuggestionsComponent} from './suggestions/suggestions.component';
import {OrderService} from './order.service';
import {SuggestionService} from './suggestion.service';
import {NotificationService} from './notification.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    EmployeeComponent,
    TeamsComponent,
    TeamComponent,
    AddHolidayComponent,
    AddTaskComponent,
    TaskComponent,
    TasksComponent,
    ReportsComponent,
    ReportComponent,
    CurrentReportComponent,
    ItemsComponent,
    ItemComponent,
    AddItemComponent,
    DeliveriesComponent,
    DeliveryComponent,
    AddDeliveryComponent,
    LoginComponent,
    ValidateComponent,
    PlanningComponent,
    SpecialPlansComponent,
    UpdateDailyPlanComponent,
    AddOrderComponent,
    AddSuggestionComponent,
    AddNotificationComponent,
    NotificationComponent,
    NotificationsComponent,
    OrderComponent,
    OrdersComponent,
    SuggestionComponent,
    SuggestionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    routing,
    FormsModule
  ],
  providers: [
    EmployeeService,
    TeamService,
    HolidayService,
    TaskService,
    ReportService,
    ItemService,
    DeliveryService,
    LoginService,
    PlanningService,
    OrderService,
    NotificationService,
    SuggestionService,
    Token,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
