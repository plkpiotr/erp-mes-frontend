import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddTaskComponent} from '../app/add-task/add-task.component';
import {TaskService} from '../app/task.service';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {EmployeeService} from '../app/employee.service';
import {EmployeeComponent} from '../app/employee/employee.component';
import {TasksComponent} from '../app/tasks/tasks.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {TeamComponent} from '../app/team/team.component';
import {TeamService} from '../app/team.service';
import {HolidayService} from '../app/holiday.service';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {TaskComponent} from '../app/task/task.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {ReportsComponent} from "../app/reports/reports.component";
import {ReportComponent} from "../app/report/report.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {ReportService} from "../app/report.service";
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {ItemComponent} from "../app/item/item.component";
import {ItemsComponent} from "../app/items/items.component";
import {AddItemComponent} from "../app/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {LoginComponent} from "../app/login/login.component";
import {ValidateComponent} from "../app/validate/validate.component";

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let service: TaskService;

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
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when form is submitted', () => {
    beforeEach(() => {
      spyOn(service, 'addTask').and.callThrough();
      component.submitForm();
    });

    it('should call taskService.addTask()', () => {
      expect(service.addTask).toHaveBeenCalled();
    });
  });
});
