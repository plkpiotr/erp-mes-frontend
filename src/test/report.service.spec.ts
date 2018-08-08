import { TestBed, inject } from '@angular/core/testing';

import { ReportService } from '../app/report.service';

describe('ReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportService]
    });
  });

  it('should be created', inject([ReportService], (service: ReportService) => {
    expect(service).toBeTruthy();
  }));
});
