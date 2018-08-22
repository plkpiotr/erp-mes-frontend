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
import {ReportService} from "../app/report.service";
import {ReportsComponent} from "../app/reports/reports.component";
import {ReportComponent} from "../app/report/report.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {ItemComponent} from "../app/item/item.component";
import {ItemsComponent} from "../app/items/items.component";
import {ItemService} from "../app/item.service";
import {DeliveryService} from "../app/delivery.service";
import {AddItemComponent} from "../app/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {LoginComponent} from "../app/login/login.component";
import {ValidateComponent} from "../app/validate/validate.component";

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
        LoginComponent
      ],
      providers: [
        EmployeeService,
        HolidayService,
        TeamService,
        TaskService,
        ReportService,
        ItemService,
        DeliveryService
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