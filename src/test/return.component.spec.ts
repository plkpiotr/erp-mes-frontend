import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnComponent } from '../app/return/return.component';
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
import {ReturnsComponent} from "../app/returns/returns.component";
import {PlanningComponent} from "../app/planning/planning.component";
import {ComplaintComponent} from "../app/complaint/complaint.component";
import {ComplaintsComponent} from "../app/complaints/complaints.component";
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
import {ActivatedRoute} from "@angular/router";
import {ReturnStatus} from "../app/types";
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

describe('ReturnComponent', () => {
  let component: ReturnComponent;
  let fixture: ComponentFixture<ReturnComponent>;
  let service: ReturnService;
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
    fixture = TestBed.createComponent(ReturnComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ReturnService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call returnService.fetchOneReturn', () => {
    spyOn(component, 'fetchReturn').and.callThrough();
    spyOn(service, 'fetchOneReturn').and.callThrough();
    component.ngOnInit();
    expect(component.fetchReturn).toHaveBeenCalled();
    expect(service.fetchOneReturn).toHaveBeenCalledWith(route.snapshot.params['id']);
    expect(component.statuses).toBeDefined();
  });

  describe('when "Zatwierdź" button is clicked', () => {
    beforeEach(() => {
      spyOn(service, 'updateReturnStatus').and.callThrough();
    });

    it('should call returnService.updateReturnStatus', () => {
      component.status = ReturnStatus.ACCEPTED;
      component.updateReturnStatus();
      expect(service.updateReturnStatus).toHaveBeenCalled();
    });
  });
});
