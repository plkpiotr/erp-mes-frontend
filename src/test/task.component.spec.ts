import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskComponent} from '../app/task/task.component';
import {TaskService} from '../app/task.service';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from '../app/app.routing';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let service: TaskService;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(appRoutes)
      ],
      declarations: [TaskComponent],
      providers: [TaskService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call taskService.fetchOneTask()', () => {
    spyOn(service, 'fetchOneTask').and.callThrough();
    component.ngOnInit();
    expect(service.fetchOneTask).toHaveBeenCalledWith(route.snapshot.params['id']);
  });
});
