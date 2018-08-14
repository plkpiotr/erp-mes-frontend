import {inject, TestBed} from '@angular/core/testing';

import {ReportService} from '../app/report.service';
import {TaskService} from "../app/task.service";
import {TeamService} from "../app/team.service";
import {HolidayService} from "../app/holiday.service";
import {EmployeeService} from "../app/employee.service";
import {ReportsComponent} from "../app/reports/reports.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {AddTaskComponent} from "../app/add-task/add-task.component";
import {AddHolidayComponent} from "../app/add-holiday/add-holiday.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {TeamComponent} from "../app/team/team.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {TasksComponent} from "../app/tasks/tasks.component";
import {TaskComponent} from "../app/task/task.component";
import {CurrentReportComponent} from "../app/current-report/current-report.component";
import {ReportComponent} from "../app/report/report.component";
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ExpenseType} from "../app/types";

const mockEstimatedCosts = {
  "id": 1,
  "estimatedIncome": 175000,
  "estimatedShippingCosts": 5000,
  "estimatedBills": 3000,
  "rent": 10000,
  "salaries": 100000,
  "stockCosts": 30000,
  "socialFund": 2000,
  "unexpected": 5000,
  "taxes": 55000
};

const mockEstimatedCostsRequest = {
  "estimatedIncome": 175000,
  "estimatedShippingCosts": 5000,
  "estimatedBills": 3000,
  "rent": 10000,
  "salaries": 100000,
  "stockCosts": 30000,
  "socialFund": 2000,
  "unexpected": 5000,
};

const mockExpenses = [
  {
    "id": 1,
    "expenseType": ExpenseType.SALARIES,
    "amount": 120000
  },
  {
    "id": 2,
    "expenseType": ExpenseType.SALARIES,
    "amount": 120000
  }
];

const mockExpenseRequest = {
  "expenseType": ExpenseType.SALARIES,
  "amount": 120000
};

const mockReports = [
  {
    "id": 1,
    "expenses": mockExpenses,
    "income": [],
    "startDate": new Date('2018-02-01'),
    "overallExpenses": 120000,
    "overallIncome": 50000,
    "balance": -70000,
    "estimatedCosts": mockEstimatedCosts
  },
  {
    "id": 2,
    "expenses": mockExpenses,
    "income": [],
    "startDate": new Date('2018-03-01'),
    "overallExpenses": 120000,
    "overallIncome": 50000,
    "balance": -70000,
    "estimatedCosts": mockEstimatedCosts
  },
  {
    "id": 3,
    "expenses": mockExpenses,
    "income": [],
    "startDate": new Date('2018-04-01'),
    "overallExpenses": 120000,
    "overallIncome": 50000,
    "balance": -70000,
    "estimatedCosts": mockEstimatedCosts
  },
  {
    "id": 4,
    "expenses": mockExpenses,
    "income": [],
    "startDate": new Date('2018-05-01'),
    "overallExpenses": 120000,
    "overallIncome": 50000,
    "balance": -70000,
    "estimatedCosts": mockEstimatedCosts
  }
];

const mockCurrentReport = {
  "id": 1,
  "expenses": mockExpenses,
  "income": [],
  "estimatedCosts": mockEstimatedCosts,
  "startDate": new Date('2018-08-14')
};

let service: ReportService;
let httpMock: HttpTestingController;

describe('ReportService', () => {
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
    });
    service = TestBed.get(ReportService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ReportService], () => {
    expect(service).toBeTruthy();
  }));

  describe('given fetchAllReports method', () => {
    describe('when called', () => {

      it('should hit "/reports" with GET and return reports', () => {
        service.fetchAllReports().subscribe(reports => {
          expect(reports.length).toBe(4);
          expect(reports).toEqual(mockReports);

          const req = httpMock.expectOne('http://localhost:8080/reports');
          expect(req.request.method).toBe('GET');
          req.flush(mockReports);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneReport method', () => {
    describe('when called', () => {

      it('should hit "/reports/1" with GET and return report', () => {
        service.fetchOneReport(1).subscribe(report => {
          expect(report).toEqual(mockReports[0]);

          const req = httpMock.expectOne('http://localhost:8080/reports/1');
          expect(req.request.method).toBe('GET');
          req.flush(mockReports[0]);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchCurrentReport method', () => {
    describe('when called', () => {

      it('should hit "/current-report" with GET and return current report', () => {
        service.fetchCurrentReport().subscribe(report => {
          expect(report).toEqual(mockCurrentReport);

          const req = httpMock.expectOne('http://localhost:8080/current-report');
          expect(req.request.method).toBe('GET');
          req.flush(mockCurrentReport);

          httpMock.verify();
        });
      });
    });
  });

  describe('given recalculateCosts method', () => {
    describe('when called', () => {

      it('should hit "/current-report" with PUT', () => {
        service.recalculateCosts(mockEstimatedCostsRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/current-report');
        expect(req.request.method).toBe('PUT');

        httpMock.verify();
      });
    });
  });

  describe('given addIncome method', () => {
    describe('when called', () => {

      it('should hit "/current-report/income" with POST', () => {
        service.addIncome(500.00).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/current-report/income');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given addExpense method', () => {
    describe('when called', () => {

      it('should hit "/current-report/income" with POST', () => {
        service.addExpense(mockExpenseRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/current-report/expense');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given fetchRecommendations method', () => {
    describe('when called', () => {

      it('should hit "/current-report/recommended-recalculations" with GET', () => {
        service.fetchRecommendations().subscribe(est => {
          expect(est).toEqual(mockEstimatedCosts);
        });

        const req = httpMock.expectOne('http://localhost:8080/current-report/recommended-recalculations');
        expect(req.request.method).toBe('GET');
        req.flush(mockEstimatedCosts);

        httpMock.verify();
      });
    });
  });
});
