import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {FormsModule} from '@angular/forms';
import {EmployeeService} from '../app/employee.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {EmployeeComponent} from '../app/employee/employee.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {TeamComponent} from '../app/team/team.component';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {HolidayService} from '../app/holiday.service';
import {TeamService} from '../app/team.service';
import {TaskComponent} from '../app/task/task.component';
import {TasksComponent} from '../app/tasks/tasks.component';
import {TaskService} from '../app/task.service';
import {AddTaskComponent} from '../app/add-task/add-task.component';
import {ReportService} from "../app/report.service";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {ReportComponent} from "../app/report/report.component";
import {ReportsComponent} from "../app/reports/reports.component";
import {ItemsComponent} from "../app/items/items.component";
import {ItemComponent} from "../app/item/item.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {ItemService} from "../app/item.service";
import {DeliveryService} from "../app/delivery.service";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {AddItemComponent} from "../app/add-item/add-item.component";

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let service: EmployeeService;

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
        DeliveriesComponent
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
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when form is submitted', () => {
    beforeEach(() => {
      spyOn(service, 'addEmployee').and.callThrough();
      component.submitForm();
    });

    it('should call employeeService.addEmployee()', () => {
      expect(service.addEmployee).toHaveBeenCalled();
    });
  });
});
