import {TestBed} from '@angular/core/testing';

import {TeamService} from '../app/team.service';
import {EmployeesComponent} from "../app/employees/employees.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {FormsModule} from "@angular/forms";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TeamsComponent} from "../app/teams/teams.component";
import {AddTeamComponent} from "../app/add-team/add-team.component";
import {TeamComponent} from "../app/team/team.component";
import {Role} from "../app/types";

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
      isPasswordValid: false
    },
    employees: [
      {
        id: 2,
        firstName: 'Ala',
        lastName: 'Makota',
        email: 'ala.makota@gmail.com',
        role: Role.HR,
        password: 'aaa333aa',
        isPasswordValid: false
      },
      {
        id: 3,
        firstName: 'Ola',
        lastName: 'Niemapsa',
        email: 'ola.mapsa@gmail.com',
        role: Role.HR,
        password: 'ooo333oo',
        isPasswordValid: false
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
      isPasswordValid: false
    },
    employees: [
      {
        id: 5,
        firstName: 'Ala',
        lastName: 'Makota',
        email: 'ala.makota@gmail.com',
        role: Role.ACCOUNTANT,
        password: 'aaa333aa',
        isPasswordValid: false
      },
      {
        id: 6,
        firstName: 'Ola',
        lastName: 'Niemapsa',
        email: 'ola.mapsa@gmail.com',
        role: Role.ACCOUNTANT,
        password: 'ooo333oo',
        isPasswordValid: false
      }
    ]
  }
];

const mockTeamRequest = {
  role: Role.WAREHOUSE,
  managerId: 1,
  employeeIds: [2, 3, 4]
};

describe('TeamService', () => {
  let service: TeamService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(appRoutes),
        FormsModule
      ],
      declarations: [
        AddEmployeeComponent,
        EmployeeComponent,
        EmployeesComponent,
        TeamsComponent,
        AddTeamComponent,
        TeamComponent
      ],
      providers: [TeamService]
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
          expect(req.request.method).toBe("GET");
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
        expect(req.request.method).toBe("GET");
        req.flush(mockTeams[0]);

        httpMock.verify();
      });
    });
  });

  describe('given addTeam method', () => {
    describe('when called', () => {

      it('should hit "/teams/add" with POST', () => {
        service.addTeam(mockTeamRequest).subscribe(() => {
        });

        const req = httpMock.expectOne('http://localhost:8080/teams');
        expect(req.request.method).toBe("POST");

        httpMock.verify();
      });
    });
  });

  describe('given deleteTeam method', () => {
    describe('when called', () => {

      it('should hit "/teams/2" with DELETE', () => {
        service.deleteTeam(2);

        const req = httpMock.expectOne('http://localhost:8080/teams/2');
        expect(req.request.method).toBe("DELETE");

        httpMock.verify();
      });
    });
  });
});
