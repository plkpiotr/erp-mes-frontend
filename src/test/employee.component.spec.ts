import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeComponent} from '../app/employee/employee.component';
import {EmployeeService} from "../app/employee.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {TeamComponent} from "../app/team/team.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {appRoutes} from "../app/app.routing";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {AddHolidayComponent} from "../app/add-holiday/add-holiday.component";

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let service: EmployeeService;
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
        EmployeeComponent,
        EmployeesComponent,
        TeamComponent,
        TeamsComponent
      ],
      providers: [
        EmployeeService,
        HolidayService,
        TeamService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(EmployeeService);
    holidayService = TestBed.get(HolidayService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call employeeService.fetchOneEmployee()', () => {
    spyOn(component, 'fetchEmployee').and.callThrough();
    spyOn(service, 'fetchOneEmployee').and.callThrough();
    component.ngOnInit();
    expect(component.fetchEmployee).toHaveBeenCalled();
    expect(service.fetchOneEmployee).toHaveBeenCalledWith(route.snapshot.params['id']);
  });

  it('should call holidayService.fetchHolidays()', () => {
    spyOn(component, 'fetchHolidays').and.callThrough();
    spyOn(holidayService, 'fetchHolidays').and.callThrough();
    component.ngOnInit();
    expect(component.fetchHolidays).toHaveBeenCalled();
    expect(holidayService.fetchHolidays).toHaveBeenCalledWith(route.snapshot.params['id']);
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
      component.approve(1,2);
      expect(holidayService.manageHolidays).toHaveBeenCalledWith(route.snapshot.params['id'],2,1,'true');
    });
  });

  describe('when "Odrzuć" button is clicked', () => {
    beforeEach(() => {
      spyOn(holidayService, 'manageHolidays').and.callThrough();
    });

    it('should call holidayService.manageHolidays() ith approve=false' , () => {
      component.decline(1,2);
      expect(holidayService.manageHolidays).toHaveBeenCalledWith(route.snapshot.params['id'],2,1,'false');
    });
  });
});
