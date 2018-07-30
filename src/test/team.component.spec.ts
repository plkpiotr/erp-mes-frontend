import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamComponent } from '../app/team/team.component';
import {TeamsComponent} from "../app/teams/teams.component";
import {EmployeesComponent} from "../app/employees/employees.component";
import {EmployeeComponent} from "../app/employee/employee.component";
import {AddEmployeeComponent} from "../app/add-employee/add-employee.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {appRoutes} from "../app/app.routing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {AddTeamComponent} from "../app/add-team/add-team.component";
import {TeamService} from "../app/team.service";
import {ActivatedRoute} from "@angular/router";

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let service: TeamService;
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
      providers: [ TeamService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TeamService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call teamService.fetchOneTeam()', () => {
    spyOn(service, 'fetchOneTeam').and.callThrough();
    component.ngOnInit();
    expect(service.fetchOneTeam).toHaveBeenCalledWith(route.snapshot.params['id']);
  });

  describe('when "Usuń zespół" button is clicked', () => {
    beforeEach(() => {
      spyOn(service, 'deleteTeam').and.callThrough();
    });

    it('should call teamService.deleteEmployee', () => {
      component.deleteTeam();
      expect(service.deleteTeam).toHaveBeenCalledWith(route.snapshot.params['id']);
    });
  });
});
