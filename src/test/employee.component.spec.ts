import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeComponent} from '../app/employee/employee.component';
import {EmployeeService} from '../app/employee.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {TeamComponent} from '../app/team/team.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {appRoutes} from '../app/app.routing';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../app/team.service';
import {HolidayService} from '../app/holiday.service';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {TasksComponent} from '../app/tasks/tasks.component';
import {TaskService} from '../app/task.service';
import {TaskComponent} from '../app/task/task.component';
import {AddTaskComponent} from '../app/add-task/add-task.component';
import {ReportsComponent} from "../app/reports/reports.component";
import {ReportComponent} from "../app/report/report.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {ReportService} from "../app/report.service";
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {ItemsComponent} from "../app/items/items.component";
import {AddItemComponent} from "../app/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {ItemComponent} from "../app/item/item.component";
import {LoginComponent} from "../app/login/login.component";
import {ValidateComponent} from "../app/validate/validate.component";
import {LoginService} from "../app/login.service";
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
        SuggestionsComponent
      ],
      providers: [
        EmployeeService,
        HolidayService,
        TeamService,
        TaskService,
        ReportService,
        ItemService,
        DeliveryService,
        LoginService,
        OrderService,
        NotificationService,
        SuggestionService
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
