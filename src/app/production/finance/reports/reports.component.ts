import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../services/report.service';
import {Router} from '@angular/router';
import {MonthlyReport} from '../../../types';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports: Array<MonthlyReport>;
  visibleReports: Array<MonthlyReport>;
  areReportsLoaded = false;

  reportsPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

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
      this.setVisibleReports();
      this.setPageNumbers();
    });
  }

  seeReport(id: number) {
    this.router.navigate(['/reports', id]);
  }

  setVisibleReports() {
    const pageIndex = (this.selectedPage - 1) * this.reportsPerPage;
    this.visibleReports = this.reports.slice(
      pageIndex,
      pageIndex + this.reportsPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.reports.length / this.reportsPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisibleReports();
  }

}
