import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportService} from '../../../services/report.service';
import {Router} from '@angular/router';
import {MonthlyReport} from '../../../types';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

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
              private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchReports();
  }

  fetchReports() {
    this.reportService.fetchAllReports().subscribe(res => {
      this.reports = res;
    }, err => {
      this.showError(err);
    }, () => {
      this.areReportsLoaded = true;
      this.dataSource = new MatTableDataSource<MonthlyReport>(this.reports);
    });
  }

  seeReport(id: number) {
    this.router.navigate(['/reports', id]);
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/employees']));
  }

}
