import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../services/report.service';
import {CurrentReport} from '../../../types';
import {MatDialog} from "@angular/material";
import {AddIncomeDialogComponent} from "../add-income-dialog/add-income-dialog.component";
import {AddExpenseDialogComponent} from "../add-expense-dialog/add-expense-dialog.component";
import {RecalculateDialogComponent} from "../recalculate-dialog/recalculate-dialog.component";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-current-report',
  templateUrl: './current-report.component.html',
  styleUrls: ['./current-report.component.scss']
})
export class CurrentReportComponent implements OnInit {

  currentReport: CurrentReport;
  isReportLoaded = false;
  areRecommendationsLoaded = false;

  estimatedIncome: number;
  estimatedShipping: number;
  estimatedBills: number;
  rent: number;
  salaries: number;
  stockCosts: number;
  socialFund: number;
  unexpected: number;

  constructor(private reportService: ReportService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.fetchReport();
    this.fetchRecommendations();
  }

  fetchRecommendations() {
    this.areRecommendationsLoaded = false;
    this.reportService.fetchRecommendations().subscribe(res => {
      this.estimatedIncome = res.estimatedIncome;
      this.estimatedShipping = res.estimatedShippingCosts;
      this.estimatedBills = res.estimatedBills;
      this.rent = res.rent;
      this.salaries = res.salaries;
      this.stockCosts = res.stockCosts;
      this.socialFund = res.socialFund;
      this.unexpected = res.unexpected;
    }, err => {
      this.showError(err, false);
    }, () => {
      this.areRecommendationsLoaded = true;
    });
  }

  fetchReport() {
    this.reportService.fetchCurrentReport().subscribe(res => {
      this.currentReport = res;
    }, err => {
      this.showError(err, true);
    }, () => {
      this.isReportLoaded = true;
    });
  }

  addIncome() {
    const dialogRef = this.dialog.open(AddIncomeDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isReportLoaded = false;
      this.fetchReport();
    });
  }

  addExpense() {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isReportLoaded = false;
      this.fetchReport();
      this.fetchRecommendations();
    });
  }

  reestimate() {
    const dialogRef = this.dialog.open(RecalculateDialogComponent, {
      width: '350px',
      data: {
        estimatedIncome: this.estimatedIncome,
        estimatedShipping: this.estimatedShipping,
        estimatedBills: this.estimatedBills,
        rent: this.rent,
        salaries: this.salaries,
        stockCosts: this.stockCosts,
        socialFund: this.socialFund,
        unexpected: this.unexpected
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isReportLoaded = false;
      this.fetchReport();
    });
  }

  showError(err, redirect: boolean) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });

    if (redirect) {
      dialogRef.afterClosed().subscribe(() => this.router.navigate(['/reports']));
    }
  }
}
