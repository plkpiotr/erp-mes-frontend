import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../services/report.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MonthlyReport} from '../../../types';
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report: MonthlyReport;
  isReportLoaded = false;

  constructor(private reportService: ReportService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchReport(this.route.snapshot.params['id']);
  }

  fetchReport(id: number) {
    this.reportService.fetchOneReport(id).subscribe(res => {
      this.report = res;
    }, err => {
      this.showError(err);
    }, () => {
      this.isReportLoaded = true;
    });
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/reports']));
  }
}
