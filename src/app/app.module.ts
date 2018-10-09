import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {routing} from './app.routing';
import {EmployeesComponent} from './staff/employees/employees/employees.component';
import {AddEmployeeComponent} from './staff/employees/add-employee/add-employee.component';
import {EmployeeComponent} from './staff/employees/employee/employee.component';
import {EmployeeService} from './services/employee.service';
import {TeamsComponent} from './staff/teams/teams/teams.component';
import {TeamComponent} from './staff/teams/team/team.component';
import {TeamService} from './services/team.service';
import {AddHolidayComponent} from './staff/holidays/add-holiday/add-holiday.component';
import {HolidayService} from './services/holiday.service';
import {AddTaskComponent} from './production/tasks/add-task/add-task.component';
import {TaskComponent} from './production/tasks/task/task.component';
import {TasksComponent} from './production/tasks/tasks/tasks.component';
import {TaskService} from './services/task.service';
import {ReportService} from './services/report.service';
import {ReportsComponent} from './production/finance/reports/reports.component';
import {ReportComponent} from './production/finance/report/report.component';
import {CurrentReportComponent} from './production/finance/current-report/current-report.component';
import {ItemService} from './services/item.service';
import {DeliveryService} from './services/delivery.service';
import {ItemsComponent} from './shop/items/items/items.component';
import {ItemComponent} from './shop/items/item/item.component';
import {AddItemComponent} from './shop/items/add-item/add-item.component';
import {DeliveriesComponent} from './shop/deliveries/deliveries/deliveries.component';
import {DeliveryComponent} from './shop/deliveries/delivery/delivery.component';
import {AddDeliveryComponent} from './shop/deliveries/add-delivery/add-delivery.component';
import {LoginComponent} from './security/login/login.component';
import {LoginService} from './services/login.service';
import {Token} from './token';
import {Interceptor} from './interceptor';
import {ValidateComponent} from './security/validate/validate.component';
import {PlanningComponent} from './production/planning/planning/planning.component';
import {SpecialPlansComponent} from './production/planning/special-plans/special-plans.component';
import {PlanningService} from './services/planning.service';
import {UpdateDailyPlanComponent} from './production/planning/update-daily-plan/update-daily-plan.component';
import {AddOrderComponent} from './shop/orders/add-order/add-order.component';
import {AddSuggestionComponent} from './communication/suggestions/add-suggestion/add-suggestion.component';
import {AddNotificationComponent} from './communication/notifications/add-notification/add-notification.component';
import {OrderComponent} from './shop/orders/order/order.component';
import {OrdersComponent} from './shop/orders/orders/orders.component';
import {NotificationComponent} from './communication/notifications/notification/notification.component';
import {NotificationsComponent} from './communication/notifications/notifications/notifications.component';
import {SuggestionComponent} from './communication/suggestions/suggestion/suggestion.component';
import {SuggestionsComponent} from './communication/suggestions/suggestions/suggestions.component';
import {OrderService} from './services/order.service';
import {SuggestionService} from './services/suggestion.service';
import {NotificationService} from './services/notification.service';
import {ReturnService} from './services/return.service';
import {ComplaintService} from './services/complaint.service';
import {ReturnsComponent} from './shop/returns/returns/returns.component';
import {ReturnComponent} from './shop/returns/return/return.component';
import {ComplaintsComponent} from './shop/complaints/complaints/complaints.component';
import {ComplaintComponent} from './shop/complaints/complaint/complaint.component';
import {InboxComponent} from './communication/emails/inbox/inbox.component';
import {OutboxComponent} from './communication/emails/outbox/outbox.component';
import {ConversationComponent} from './communication/emails/conversation/conversation.component';
import {AddEmailComponent} from './communication/emails/add-email/add-email.component';
import {EmailService} from './services/email.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';
import { SpecialOfferDialogComponent } from './shop/items/special-offer-dialog/special-offer-dialog.component';
import { ReplyDialogComponent } from './communication/emails/reply-dialog/reply-dialog.component';
import { ManageHolidaysDialogComponent } from './staff/holidays/manage-holidays-dialog/manage-holidays-dialog.component';
import { NewPriceDialogComponent } from './shop/items/new-price-dialog/new-price-dialog.component';
import {MatSortModule, MatTableModule} from '@angular/material';
import {KanbanComponent} from './production/tasks/kanban/kanban.component';
import {TasksDoingPipe} from './pipes/tasks-doing.pipe';
import {TasksDonePipe} from './pipes/tasks-done.pipe';
import {TasksTodoPipe} from './pipes/tasks-todo.pipe';
import { EnumerationPipe } from './pipes/enumeration.pipe';
import { StatusDialogComponent } from './shop/returns/status-dialog/status-dialog.component';
import { OrderStatusDialogComponent } from './shop/orders/order-status-dialog/order-status-dialog.component';
import { ComplaintStatusDialogComponent } from './shop/complaints/complaint-status-dialog/complaint-status-dialog.component';
import { ComplaintResolutionDialogComponent } from './shop/complaints/complaint-resolution-dialog/complaint-resolution-dialog.component';
import { NoCommaNumberPipe } from './pipes/no-comma-number.pipe';
import { AddIncomeDialogComponent } from './production/finance/add-income-dialog/add-income-dialog.component';
import { AddExpenseDialogComponent } from './production/finance/add-expense-dialog/add-expense-dialog.component';
import { RecalculateDialogComponent } from './production/finance/recalculate-dialog/recalculate-dialog.component';
import { SpecialPlanNoDateDialogComponent } from './production/planning/special-plan-no-date-dialog/special-plan-no-date-dialog.component';
import { SpecialPlanDialogComponent } from './production/planning/special-plan-dialog/special-plan-dialog.component';
import { ShowSpecialPlanDialogComponent } from './production/planning/show-special-plan-dialog/show-special-plan-dialog.component';

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
    SuggestionsComponent,
    ReturnsComponent,
    ReturnComponent,
    ComplaintsComponent,
    ComplaintComponent,
    InboxComponent,
    OutboxComponent,
    ConversationComponent,
    AddEmailComponent,
    KanbanComponent,
    TasksDoingPipe,
    TasksDonePipe,
    TasksTodoPipe,
    EnumerationPipe,
    AddEmailComponent,
    SpecialOfferDialogComponent,
    ReplyDialogComponent,
    ManageHolidaysDialogComponent,
    NewPriceDialogComponent,
    StatusDialogComponent,
    OrderStatusDialogComponent,
    ComplaintStatusDialogComponent,
    ComplaintResolutionDialogComponent,
    NoCommaNumberPipe,
    AddIncomeDialogComponent,
    AddExpenseDialogComponent,
    RecalculateDialogComponent,
    SpecialPlanNoDateDialogComponent,
    SpecialPlanDialogComponent,
    ShowSpecialPlanDialogComponent,
  ],
  entryComponents: [
    SpecialOfferDialogComponent,
    ReplyDialogComponent,
    ManageHolidaysDialogComponent,
    NewPriceDialogComponent,
    StatusDialogComponent,
    OrderStatusDialogComponent,
    ComplaintStatusDialogComponent,
    ComplaintResolutionDialogComponent,
    AddIncomeDialogComponent,
    AddExpenseDialogComponent,
    RecalculateDialogComponent,
    SpecialPlanDialogComponent,
    SpecialPlanNoDateDialogComponent,
    ShowSpecialPlanDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    routing,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserModule,
    MatTableModule,
    MatSortModule
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
    ReturnService,
    ComplaintService,
    EmailService,
    {provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
