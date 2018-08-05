import {TestBed} from '@angular/core/testing';

import {EmployeeService} from '../app/employee.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {EmployeesComponent} from '../app/employees/employees.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {EmployeeComponent} from '../app/employee/employee.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {TeamComponent} from '../app/team/team.component';
import {FormsModule} from '@angular/forms';
import {Role} from '../app/types';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {HolidayService} from '../app/holiday.service';
import {TeamService} from '../app/team.service';

const mockEmployees = [
  {
    id: 1,
    firstName: 'Ala',
    lastName: 'Makota',
    email: 'ala.makota@gmail.com',
    role: Role.ACCOUNTANT,
    password: 'aaa333aa',
    passwordValid: false
  },
  {
    id: 2,
    firstName: 'Ola',
    lastName: 'Mapsa',
    email: 'ola.mapsa@gmail.com',
    role: Role.HR,
    password: 'ooo333oo',
    passwordValid: false
  }
];

const mockManagers = [
  {
    id: 1,
    firstName: 'Ala',
    lastName: 'Makota',
    email: 'ala.makota@gmail.com',
    role: Role.ADMIN_ACCOUNTANT,
    password: 'aaa333aa',
    passwordValid: false
  },
  {
    id: 2,
    firstName: 'Ola',
    lastName: 'Mapsa',
    email: 'ola.mapsa@gmail.com',
    role: Role.ADMIN_HR,
    password: 'ooo333oo',
    passwordValid: false
  }
];

const employeeRequest = {
  firstName: 'Jola',
  lastName: 'Makanarka',
  email: 'jola.makanarka@gmail.com',
  role: Role.WAREHOUSE
};

describe('EmployeeService', () => {
  let service: EmployeeService;
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
    });
    service = TestBed.get(EmployeeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchAllEmployees method', () => {
    describe('when called', () => {

      it('should hit "/employees" with GET and return employees', () => {
        service.fetchAllEmployees().subscribe(employees => {
          expect(employees.length).toBe(2);
          expect(employees).toEqual(mockEmployees);

          const req = httpMock.expectOne('http://localhost:8080/employees');
          expect(req.request.method).toBe('GET');
          req.flush(mockEmployees);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchAllManagers method', () => {
    describe('when called', () => {

      it('should hit "/employees?privilege=admin" with GET and return managers', () => {
        service.fetchAllManagers().subscribe(managers => {
          expect(managers.length).toBe(2);
          expect(managers).toEqual(mockEmployees);

          const req = httpMock.expectOne('http://localhost:8080/employees?privilege=admin');
          expect(req.request.method).toBe('GET');
          req.flush(mockManagers);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchAllNonManagers method', () => {
    describe('when called', () => {

      it('should hit "/employees?privilege=user" with GET and return non-managers', () => {
        service.fetchAllNonManagers().subscribe(employees => {
          expect(employees.length).toBe(2);
          expect(employees).toEqual(mockEmployees);

          const req = httpMock.expectOne('http://localhost:8080/employees?privilege=user');
          expect(req.request.method).toBe('GET');
          req.flush(mockEmployees);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneEmployee method', () => {
    describe('when called', () => {

      it('should hit "/empployees/1" with GET and return employee', () => {
        service.fetchOneEmployee(1).subscribe(employee => {
          expect(employee).toEqual(mockEmployees[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/employees/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockEmployees[0]);

        httpMock.verify();
      });
    });
  });

  describe('given addEmployee method', () => {
    describe('when called', () => {

      it('should hit "/employees/add" with POST', () => {
        service.addEmployee(employeeRequest).subscribe(() => {});

        const req = httpMock.expectOne('http://localhost:8080/employees');
        expect(req.request.method).toBe('POST');

        httpMock.verify();
      });
    });
  });

  describe('given deleteEmployee method', () => {
    describe('when called', () => {

      it('should hit "/employees/2" with DELETE', () => {
        service.deleteEmployee(2);

        const req = httpMock.expectOne('http://localhost:8080/employees/2');
        expect(req.request.method).toBe('DELETE');

        httpMock.verify();
      });
    });
  });
});
