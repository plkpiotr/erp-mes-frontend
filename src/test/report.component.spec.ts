import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from '../app/report/report.component';
import {ReportService} from "../app/report.service";
import {TaskService} from "../app/task.service";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
import {ReportsComponent} from "../app/reports/reports.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {TaskComponent} from "../app/task/task.component";
import {TasksComponent} from "../app/tasks/tasks.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {TeamComponent} from "../app/team/team.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {AddTaskComponent} from "../app/add-task/add-task.component";
import {AddHolidayComponent} from "../app/add-holiday/add-holiday.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;
  let service: ReportService;

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
        EmployeeComponent,
        EmployeesComponent,
        TeamComponent,
        TeamsComponent,
        TasksComponent,
        TaskComponent,
        CurrentReportComponent,
        ReportComponent,
        ReportsComponent
      ],
      providers: [
        EmployeeService,
        HolidayService,
        TeamService,
        TaskService,
        ReportService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ReportService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reportService.fetchOneReport', () => {
    spyOn(component, 'fetchReport').and.callThrough();
    spyOn(service, 'fetchOneReport').and.callThrough();
    component.ngOnInit();
    expect(component.fetchReport).toHaveBeenCalled();
    expect(service.fetchOneReport).toHaveBeenCalled();
  });
});
