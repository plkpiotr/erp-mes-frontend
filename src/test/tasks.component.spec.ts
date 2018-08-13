import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import {TasksComponent} from '../app/tasks/tasks.component';
import {TaskService} from '../app/task.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';
import {TeamService} from '../app/team.service';

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
      declarations: [TasksComponent],
      providers: [TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TeamService);
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
