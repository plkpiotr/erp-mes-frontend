import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentReportComponent } from '../app/current-report/current-report.component';

describe('CurrentReportComponent', () => {
  let component: CurrentReportComponent;
  let fixture: ComponentFixture<CurrentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
