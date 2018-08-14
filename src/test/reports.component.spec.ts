import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ReportsComponent } from '../app/reports/reports.component';
import {ReportService} from "../app/report.service";
import {TaskService} from "../app/task.service";
import {TasksComponent} from "../app/tasks/tasks.component";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
import {ReportComponent} from "../app/report/report.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {TaskComponent} from "../app/task/task.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {TeamComponent} from "../app/team/team.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {AddTaskComponent} from "../app/add-task/add-task.component";
import {AddHolidayComponent} from "../app/add-holiday/add-holiday.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from '@angular/common';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let service: ReportService;
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
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ReportService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reportService.fetchAllReports', () => {
    spyOn(component, 'fetchReports').and.callThrough();
    spyOn(service, 'fetchAllReports').and.callThrough();
    component.ngOnInit();
    expect(component.fetchReports).toHaveBeenCalled();
    expect(service.fetchAllReports).toHaveBeenCalled();
  });

  describe('When "Zobacz" button is clicked', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.callThrough();
    });

    it('should call router.navigate()', fakeAsync(() => {
      component.seeReport(1);
      expect(router.navigate).toHaveBeenCalled();
      tick(50);
      expect(location.path()).toBe('/reports/1');
    }));
  });
});
