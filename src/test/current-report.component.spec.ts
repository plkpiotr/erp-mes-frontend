import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentReportComponent } from '../app/current-report/current-report.component';
import {ReportService} from "../app/report.service";
import {TaskService} from "../app/task.service";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
import {ReportsComponent} from "../app/reports/reports.component";
import {ReportComponent} from "../app/report/report.component";
import {TeamComponent} from "../app/team/team.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {AddTaskComponent} from "../app/add-task/add-task.component";
import {AddHolidayComponent} from "../app/add-holiday/add-holiday.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {TeamsComponent} from "../app/teams/teams.component";
import {TasksComponent} from "../app/tasks/tasks.component";
import {TaskComponent} from "../app/task/task.component";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DeliveryService} from "../app/delivery.service";
import {ItemService} from "../app/item.service";
import {DeliveriesComponent} from "../app/deliveries/deliveries.component";
import {DeliveryComponent} from "../app/delivery/delivery.component";
import {ItemComponent} from "../app/item/item.component";
import {ItemsComponent} from "../app/items/items.component";
import {AddDeliveryComponent} from "../app/add-delivery/add-delivery.component";
import {AddItemComponent} from "../app/add-item/add-item.component";

describe('CurrentReportComponent', () => {
  let component: CurrentReportComponent;
  let fixture: ComponentFixture<CurrentReportComponent>;
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
    fixture = TestBed.createComponent(CurrentReportComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ReportService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reportService.fetchCurrentReport()', () => {
    spyOn(component, 'fetchReport').and.callThrough();
    spyOn(service, 'fetchCurrentReport').and.callThrough();
    component.ngOnInit();
    expect(component.fetchReport).toHaveBeenCalled();
    expect(service.fetchCurrentReport).toHaveBeenCalled();
  });

  it('should call reportService.fetchRecommendations()', () => {
    spyOn(component, 'fetchRecommendations').and.callThrough();
    spyOn(service, 'fetchRecommendations').and.callThrough();
    component.ngOnInit();
    expect(component.fetchRecommendations).toHaveBeenCalled();
    expect(service.fetchRecommendations).toHaveBeenCalled();
  });

  describe('when "Dodaj wydatek" button is clicked', () => {
    beforeEach(() => {
      spyOn(service, 'addExpense').and.callThrough();
    });

    it('should add expense', () => {
      component.addExpense();
      expect(service.addExpense).toHaveBeenCalled();
    });
  });

  describe('when "Dodaj zysk" button is clicked', () => {
    beforeEach(() => {
      spyOn(service, 'addIncome').and.callThrough();
    });

    it('should add income', () => {
      component.addIncome();
      expect(service.addIncome).toHaveBeenCalled();
    });
  });

  describe('when "Przelicz prognozowane koszty" button is clicked', () => {
    beforeEach(() => {
      spyOn(service, 'recalculateCosts').and.callThrough();
    });

    it('should call reportService.recalculateCosts', () => {
      component.reestimate();
      expect(service.recalculateCosts).toHaveBeenCalled();
    });
  });
});
