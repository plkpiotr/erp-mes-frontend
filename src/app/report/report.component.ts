import { Component, OnInit } from '@angular/core';
import {ReportService} from "../report.service";
import {ActivatedRoute} from "@angular/router";
import {MonthlyReport} from "../types";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  private report: MonthlyReport;
  private isReportLoaded = false;

  constructor(private reportService: ReportService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchReport(this.route.snapshot.params['id']);
  }

  fetchReport(id: number) {
    this.reportService.fetchOneReport(id).subscribe(res => {
      this.report = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isReportLoaded = true;
    })
  }

}
