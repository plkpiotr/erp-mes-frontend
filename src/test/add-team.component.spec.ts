import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamComponent } from '../app/add-team/add-team.component';
import {FormsModule} from "@angular/forms";
import {TeamService} from "../app/team.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {EmployeesComponent} from "../app/employees/employees.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {TeamComponent} from "../app/team/team.component";
import {EmployeeService} from "../app/employee.service";

describe('AddTeamComponent', () => {
  let component: AddTeamComponent;
  let fixture: ComponentFixture<AddTeamComponent>;
  let employeeService: EmployeeService;
  let teamService: TeamService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(appRoutes)
      ],
      declarations: [
        AddEmployeeComponent,
        EmployeeComponent,
        EmployeesComponent,
        TeamsComponent,
        AddTeamComponent,
        TeamComponent
      ],
      providers: [
        TeamService,
        EmployeeService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeamComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.get(EmployeeService);
    teamService = TestBed.get(TeamService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call employeeService.fetchAllManagers()', () => {
    spyOn(employeeService, 'fetchAllManagers').and.callThrough();
    component.ngOnInit();
    expect(employeeService.fetchAllManagers).toHaveBeenCalled();
  });

  it('should call employeeService.fetchAllNonManagers()', () => {
    spyOn(employeeService, 'fetchAllNonManagers').and.callThrough();
    component.ngOnInit();
    expect(employeeService.fetchAllNonManagers).toHaveBeenCalled();
  });

  describe('when form is submitted', () => {
    beforeEach(() => {
      spyOn(teamService, 'addTeam').and.callThrough();
      component.submitForm();
    });

    it('should call teamService.addTeam()', () => {
      expect(teamService.addTeam).toHaveBeenCalled();
    });
  });
});
