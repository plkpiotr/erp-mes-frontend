import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../services/report.service';
import {CurrentReport, EstimatedCostsRequest, ExpenseRequest, ExpenseType} from '../../../types';

@Component({
  selector: 'app-current-report',
  templateUrl: './current-report.component.html',
  styleUrls: ['./current-report.component.scss']
})
export class CurrentReportComponent implements OnInit {

  currentReport: CurrentReport;
  income: number;
  expenseType: ExpenseType;
  expenseAmount: number;
  isReportLoaded = false;
  areRecommendationsLoaded = false;
  showAddIncome = false;
  showAddExpense = false;
  showReestimate = false;
  expenseRequest: ExpenseRequest;
  types;

  estimatedIncome: number;
  estimatedShipping: number;
  estimatedBills: number;
  rent: number;
  salaries: number;
  stockCosts: number;
  socialFund: number;
  unexpected: number;
  estimatedCostsRequest: EstimatedCostsRequest;

  constructor(private reportService: ReportService) {
  }

  ngOnInit() {
    this.fetchReport();
    this.types = Object.keys(ExpenseType);
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
      console.log(err);
    }, () => {
      this.areRecommendationsLoaded = true;
    });
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

  addExpense() {
    this.isReportLoaded = false;
    this.expenseRequest = {
      expenseType: this.expenseType,
      amount: this.expenseAmount
    };
    this.reportService.addExpense(this.expenseRequest).subscribe(res => {
      this.currentReport = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isReportLoaded = true;
    });
    this.showAddExpense = false;
  }

  reestimate() {
    this.isReportLoaded = false;
    this.estimatedCostsRequest = {
      estimatedIncome: this.estimatedIncome,
      estimatedShippingCosts: this.estimatedShipping,
      estimatedBills: this.estimatedBills,
      rent: this.rent,
      salaries: this.salaries,
      stockCosts: this.stockCosts,
      socialFund: this.socialFund,
      unexpected: this.unexpected
    };
    this.reportService.recalculateCosts(this.estimatedCostsRequest).subscribe(res => {
      this.currentReport = res;
    }, err => {
      console.log(err);
    }, () => {
      this.isReportLoaded = true;
      this.fetchRecommendations();
    });
  }
}
