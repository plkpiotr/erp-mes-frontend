import {TestBed} from '@angular/core/testing';

import {TeamService} from '../app/team.service';
import {EmployeesComponent} from '../app/employees/employees.component';
import {EmployeeComponent} from '../app/employee/employee.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {FormsModule} from '@angular/forms';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TeamsComponent} from '../app/teams/teams.component';
import {TeamComponent} from '../app/team/team.component';
import {Role} from '../app/types';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {EmployeeService} from '../app/employee.service';
import {HolidayService} from '../app/holiday.service';

const mockTeams = [
  {
    id: 1,
    role: Role.HR,
    manager: {
      id: 1,
      firstName: 'Ola',
      lastName: 'Mapsa',
      email: 'ola.mapsa@gmail.com',
      role: Role.ADMIN_HR,
      password: 'ooo333oo',
      passwordValid: false
    },
    employees: [
      {
        id: 2,
        firstName: 'Ala',
        lastName: 'Makota',
        email: 'ala.makota@gmail.com',
        role: Role.HR,
        password: 'aaa333aa',
        passwordValid: false
      },
      {
        id: 3,
        firstName: 'Ola',
        lastName: 'Niemapsa',
        email: 'ola.mapsa@gmail.com',
        role: Role.HR,
        password: 'ooo333oo',
        passwordValid: false
      }
    ]
  },
  {
    id: 2,
    role: Role.ACCOUNTANT,
    manager: {
      id: 4,
      firstName: 'Ola',
      lastName: 'Mapsa',
      email: 'ola.mapsa@gmail.com',
      role: Role.ADMIN_ACCOUNTANT,
      password: 'ooo333oo',
      passwordValid: false
    },
    employees: [
      {
        id: 5,
        firstName: 'Ala',
        lastName: 'Makota',
        email: 'ala.makota@gmail.com',
        role: Role.ACCOUNTANT,
        password: 'aaa333aa',
        passwordValid: false
      },
      {
        id: 6,
        firstName: 'Ola',
        lastName: 'Niemapsa',
        email: 'ola.mapsa@gmail.com',
        role: Role.ACCOUNTANT,
        password: 'ooo333oo',
        passwordValid: false
      }
    ]
  }
];

describe('TeamService', () => {
  let service: TeamService;
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
    service = TestBed.get(TeamService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('given fetchAllTeams method', () => {
    describe('when called', () => {

      it('should hit "/teams" with GET and return teams', () => {
        service.fetchAllTeams().subscribe(teams => {
          expect(teams.length).toBe(2);
          expect(teams).toEqual(mockTeams);

          const req = httpMock.expectOne('http://localhost:8080/teams');
          expect(req.request.method).toBe('GET');
          req.flush(mockTeams);

          httpMock.verify();
        });
      });
    });
  });

  describe('given fetchOneTeam method', () => {
    describe('when called', () => {

      it('should hit "/teams/1" with GET and return team', () => {
        service.fetchOneTeam(1).subscribe(team => {
          expect(team).toEqual(mockTeams[0]);
        });

        const req = httpMock.expectOne('http://localhost:8080/teams/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockTeams[0]);

        httpMock.verify();
      });
    });
  });
});
