import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TeamsComponent} from '../app/teams/teams.component';
import {EmployeeComponent} from '../app/employee/employee.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {FormsModule} from '@angular/forms';
import {appRoutes} from '../app/app.routing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EmployeesComponent} from '../app/employees/employees.component';
import {TeamComponent} from '../app/team/team.component';
import {TeamService} from '../app/team.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {EmployeeService} from '../app/employee.service';
import {HolidayService} from '../app/holiday.service';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;
  let service: TeamService;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TeamService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call teamService.fetchAllTeams()', () => {
    spyOn(service, 'fetchAllTeams').and.callThrough();
    component.ngOnInit();
    expect(service.fetchAllTeams).toHaveBeenCalled();
  });

  describe('When "Zobacz zespół" button is clicked', () => {
    beforeEach(() => {
      spyOn(router, 'navigate').and.callThrough();
    });

    it('should call router.navigate()', fakeAsync(() => {
      component.seeTeam(1);
      expect(router.navigate).toHaveBeenCalled();
      tick(50);
      expect(location.path()).toBe('/teams/1');
    }));
  });
});
