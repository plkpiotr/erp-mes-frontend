import { TestBed, inject } from '@angular/core/testing';

import { EmployeeService } from '../app/employee.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {appRoutes} from "../app/app.routing";
import {EmployeesComponent} from "../app/employees/employees.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {AddTeamComponent} from "../app/add-team/add-team.component";
import {TeamComponent} from "../app/team/team.component";
import {FormsModule} from "@angular/forms";

describe('EmployeeService', () => {
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
      providers: [EmployeeService]
    });
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));
});
