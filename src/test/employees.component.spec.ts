import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {EmployeesComponent} from '../app/employees/employees.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {EmployeeComponent} from '../app/employee/employee.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {TeamComponent} from '../app/team/team.component';
import {EmployeeService} from '../app/employee.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {HolidayService} from '../app/holiday.service';
import {TeamService} from '../app/team.service';
import {TasksComponent} from '../app/tasks/tasks.component';
import {TaskService} from '../app/task.service';
import {TaskComponent} from '../app/task/task.component';
import {AddTaskComponent} from '../app/add-task/add-task.component';
import {ReportService} from '../app/report.service';
import {ReportsComponent} from '../app/reports/reports.component';
import {ReportComponent} from '../app/report/report.component';
import {CurrentReportComponent} from '../app/current-report/current-report.component';
import {DeliveriesComponent} from '../app/deliveries/deliveries.component';
import {DeliveryComponent} from '../app/delivery/delivery.component';
import {ItemComponent} from '../app/item/item.component';
import {ItemsComponent} from '../app/items/items.component';
import {ItemService} from '../app/item.service';
import {DeliveryService} from '../app/delivery.service';
import {AddItemComponent} from '../app/add-item/add-item.component';
import {AddDeliveryComponent} from '../app/add-delivery/add-delivery.component';
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
import {SpecialPlansComponent} from '../app/special-plans/special-plans.component';
import {PlanningComponent} from '../app/planning/planning.component';
import {UpdateDailyPlanComponent} from '../app/update-daily-plan/update-daily-plan.component';
import {PlanningService} from '../app/planning.service';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let service: EmployeeService;
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
        PlanningService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    service = TestBed.get(EmployeeService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call employeeService.fetchAllEmployees()', () => {
    spyOn(component, 'fetchEmployees').and.callThrough();
    spyOn(service, 'fetchAllEmployees').and.callThrough();
    component.ngOnInit();
    expect(component.fetchEmployees).toHaveBeenCalled();
    expect(service.fetchAllEmployees).toHaveBeenCalled();
  });

  describe('When "Zobacz" button is clicked', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.callThrough();
    });

    it('should call router.navigate()', fakeAsync(() => {
      component.fetchEmployee(1);
      expect(router.navigate).toHaveBeenCalled();
      tick(50);
      expect(location.path()).toBe('/employees/1');
    }));
  });

  describe('When "Dodaj pracownika" button is clicked', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.callThrough();
    });

    it('should call router.navigate()', fakeAsync(() => {
      component.addEmployee();
      expect(router.navigate).toHaveBeenCalled();
      tick(50);
      expect(location.path()).toBe('/employees/add');
    }));
  });
});
