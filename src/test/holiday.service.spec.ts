import {inject, TestBed} from '@angular/core/testing';

import {HolidayService} from '../app/holiday.service';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {EmployeeComponent} from '../app/employee/employee.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {TeamComponent} from '../app/team/team.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {EmployeeService} from '../app/employee.service';
import {TeamService} from '../app/team.service';
import {ApprovalState, HolidayType, Role} from '../app/types';
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

const mockContract = {
  id: 1,
  accountNumber: '11111111111111111111111111',
  daysOffPerYear: 26,
  salary: 3000.00
};

const mockEmployee = {
  id: 1,
  firstName: 'Ala',
  lastName: 'Makota',
  email: 'ala.makota@gmail.com',
  role: Role.ACCOUNTANT,
  password: 'aaa333aa',
  passwordValid: false,
  contract: mockContract
};

const mockHolidays = [
  {
    id: 1,
    startDate: new Date('2018-08-15'),
    duration: 5,
    holidayType: HolidayType.VACATION,
    approvalState: ApprovalState.PENDING,
    employee: mockEmployee
  },
  {
    id: 2,
    startDate: new Date('2018-08-31'),
    duration: 5,
    holidayType: HolidayType.VACATION,
    approvalState: ApprovalState.PENDING,
    employee: mockEmployee
  }
];

const mockApprovedHoliday = {
  id: 1,
  startDate: new Date('2018-08-15'),
  duration: 5,
  holidayType: HolidayType.VACATION,
  approvalState: ApprovalState.APPROVED,
  employee: mockEmployee
};

const mockHolidayRequest = {
  startDate: new Date('2018-09-15'),
  duration: 14,
  holidayType: HolidayType.VACATION
};

describe('HolidayService', () => {
  let service: HolidayService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
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
    });
    service = TestBed.get(HolidayService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([HolidayService], () => {
    expect(service).toBeTruthy();
  }));

  describe('given fetchHolidays method', () => {
    describe('when called', () => {

      it('should hit "/employees/{employeeId}/holidays" with GET and return holidays', () => {
        service.fetchHolidays(1).subscribe(holidays => {
          expect(holidays.length).toBe(2);
          expect(holidays).toEqual(mockHolidays);

          const req = httpMock.expectOne('http://localhost:8080/employees/1/holidays');
          expect(req.request.method).toBe('GET');
          req.flush(mockHolidays);

          httpMock.verify();
        });
      });
    });
  });

  describe('given addHoliday method', () => {
    describe('when called', () => {

      it('should hit "/holidays/add" with POST', () => {
        service.addHoliday(mockHolidayRequest, 1);

        const req = httpMock.expectOne('http://localhost:8080/employees/1/holidays');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given fetchHolidaysToApprove method', () => {
    describe('when called', () => {

      it('should hit "/employees/{managerId}/subordinates/holiday-requests" with GET and return holidays', () => {
        service.fetchHolidaysToApprove(1).subscribe(holidays => {
          expect(holidays.length).toBe(2);
          expect(holidays).toEqual(mockHolidays);

          const req = httpMock.expectOne('http://localhost:8080/employees/1/subordinates/holiday-requests');
          expect(req.request.method).toBe('GET');
          req.flush(mockHolidays);

          httpMock.verify();
        });
      });
    });
  });

  describe('given manageHolidays method', () => {
    describe('when called', () => {

      it('should hit "/employees/{managerId}/subordinates/{subordinateId}/holidays" with POST', () => {
        service.manageHolidays(1, 2, 1, 'true').subscribe(holiday => {
          expect(holiday.approvalState).toBe(ApprovalState.APPROVED);
          expect(holiday).toEqual(mockApprovedHoliday);

          const req = httpMock.expectOne('http://localhost:8080/employees/1/subordinates/2/holidays');
          expect(req.request.method).toBe('POST');
          req.flush(mockApprovedHoliday);

          httpMock.verify();
        });
      });
    });
  });
});
