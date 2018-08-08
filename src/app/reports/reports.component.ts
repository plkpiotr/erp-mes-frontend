import { Component, OnInit } from '@angular/core';
import {ReportService} from "../report.service";
import {Router} from "@angular/router";
import {MonthlyReport} from "../types";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  private reports: MonthlyReport[];
  private areReportsLoaded = false;

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
    })
  }

  seeReport(id: number) {
    this.router.navigate(['/reports', id]);
  }

}
