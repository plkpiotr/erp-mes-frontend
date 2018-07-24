import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from '../app/employees/employees.component';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {appRoutes} from "../app/app.routing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {AddTeamComponent} from "../app/add-team/add-team.component";
import {TeamComponent} from "../app/team/team.component";
import {EmployeeService} from "../app/employee.service";

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(appRoutes),
        HttpClientTestingModule
      ],
      declarations: [
        AddEmployeeComponent,
        EmployeeComponent,
        EmployeesComponent,
        TeamsComponent,
        AddTeamComponent,
        TeamComponent
      ],
      providers: [ EmployeeService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
