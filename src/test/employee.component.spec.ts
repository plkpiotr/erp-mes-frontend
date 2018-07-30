import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeComponent} from '../app/employee/employee.component';
import {EmployeeService} from "../app/employee.service";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {TeamComponent} from "../app/team/team.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {TeamsComponent} from "../app/teams/teams.component";
import {AddTeamComponent} from "../app/add-team/add-team.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {appRoutes} from "../app/app.routing";
import {ActivatedRoute} from "@angular/router";

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let service: EmployeeService;
  let route: ActivatedRoute;

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
      providers: [
        EmployeeService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(EmployeeService);
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

  describe('when "Usuń pracownika" button is clicked', () => {
    beforeEach(() => {
      spyOn(service, 'deleteEmployee').and.callThrough();
    });

    it('should call employeeService.deleteEmployee', () => {
      component.deleteEmployee();
      expect(service.deleteEmployee).toHaveBeenCalledWith(route.snapshot.params['id']);
    });
  });
});
