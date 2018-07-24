import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {FormsModule} from "@angular/forms";
import {EmployeeService} from "../app/employee.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {EmployeeComponent} from "../app/employee/employee.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {AddTeamComponent} from "../app/add-team/add-team.component";
import {TeamComponent} from "../app/team/team.component";

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;

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
      providers: [EmployeeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
