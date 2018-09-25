import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../../../services/report.service';
import {Router} from '@angular/router';
import {MonthlyReport} from '../../../types';
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports: Array<MonthlyReport>;
  areReportsLoaded = false;
  dataSource: MatTableDataSource<MonthlyReport> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private reportService: ReportService,
              private router: Router) { }

  ngOnInit() {
    this.fetchReports();
  }

  fetchReports() {
    this.reportService.fetchAllReports().subscribe(res => {
      this.reports = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areReportsLoaded = true;
      this.dataSource = new MatTableDataSource<MonthlyReport>(this.reports);
    });
  }

  seeReport(id: number) {
    this.router.navigate(['/reports', id]);
  }

}
