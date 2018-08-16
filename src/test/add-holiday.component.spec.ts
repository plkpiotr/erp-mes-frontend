import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {EmployeeComponent} from '../app/employee/employee.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {TeamComponent} from '../app/team/team.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {EmployeeService} from '../app/employee.service';
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
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {ItemComponent} from "../app/item/item.component";
import {ItemsComponent} from "../app/items/items.component";
import {AddItemComponent} from "../app/add-item/add-item.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";

describe('AddHolidayComponent', () => {
  let component: AddHolidayComponent;
  let fixture: ComponentFixture<AddHolidayComponent>;
  let service: HolidayService;

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
    fixture = TestBed.createComponent(AddHolidayComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HolidayService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when form is submitted', () => {
    beforeEach(() => {
      spyOn(service, 'addHoliday').and.callThrough();
      component.submitForm();
    });

    it('should call holidayService.addHoliday()', () => {
      expect(service.addHoliday).toHaveBeenCalled();
    });
  });
});
