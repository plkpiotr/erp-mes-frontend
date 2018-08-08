import {Component, OnInit} from '@angular/core';
import {ReportService} from "../report.service";
import {CurrentReport} from "../types";

@Component({
  selector: 'app-current-report',
  templateUrl: './current-report.component.html',
  styleUrls: ['./current-report.component.css']
})
export class CurrentReportComponent implements OnInit {

  private currentReport: CurrentReport;
  private income: number;
  private isReportLoaded = false;
  private showAddIncome = false;

  constructor(private reportService: ReportService) {
  }

  ngOnInit() {
    this.fetchReport();
  }

  fetchReport() {
    this.reportService.fetchCurrentReport().subscribe(res => {
      this.currentReport = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isReportLoaded = true;
    });
  }

  addIncome() {
    this.isReportLoaded = false;
    this.reportService.addIncome(this.income).subscribe(res => {
      this.currentReport = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isReportLoaded = true;
    });
    this.showAddIncome = false;
  }

}
