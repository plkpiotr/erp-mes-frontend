import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TasksComponent} from '../app/tasks/tasks.component';
import {TaskService} from '../app/task.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {TeamService} from '../app/team.service';
import {EmployeeService} from '../app/employee.service';
import {EmployeeComponent} from '../app/employee/employee.component';
import {TeamsComponent} from '../app/teams/teams.component';
import {TeamComponent} from '../app/team/team.component';
import {HolidayService} from '../app/holiday.service';
import {AddHolidayComponent} from '../app/add-holiday/add-holiday.component';
import {AddEmployeeComponent} from '../app/add-employee/add-employee.component';
import {TaskComponent} from '../app/task/task.component';
import {EmployeesComponent} from '../app/employees/employees.component';
import {AddTaskComponent} from '../app/add-task/add-task.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let service: TaskService;
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
        AddTaskComponent,
        EmployeeComponent,
        EmployeesComponent,
        TeamComponent,
        TeamsComponent,
        TasksComponent,
        TaskComponent
      ],
      providers: [
        EmployeeService,
        HolidayService,
        TeamService,
        TaskService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call taskService.fetchAllTasks()', () => {
    spyOn(service, 'fetchAllTasks').and.callThrough();
    component.ngOnInit();
    expect(service.fetchAllTasks).toHaveBeenCalled();
  });
});
