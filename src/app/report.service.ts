import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {CurrentReport, EstimatesCostsRequest, ExpenseRequest, MonthlyReport} from "./types";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllReports(): Observable<Array<MonthlyReport>> {
    return this.http.get<Array<MonthlyReport>>('http://localhost:8080/reports',
      {headers: this.httpHeaders});
  }

  fetchOneReport(id: number): Observable<MonthlyReport> {
    return this.http.get<MonthlyReport>('http://localhost:8080/reports/' + id,
      {headers: this.httpHeaders});
  }

  fetchCurrentReport(): Observable<CurrentReport> {
    return this.http.get<CurrentReport>('http://localhost:8080/current-report',
      {headers: this.httpHeaders});
  }

  recalculateCosts(request: EstimatesCostsRequest): Observable<CurrentReport> {
    return this.http.put<CurrentReport>('http://localhost:8080/current-report', request,
      {headers: this.httpHeaders});
  }

  addIncome(amount: number): Observable<CurrentReport> {
    return this.http.post<CurrentReport>('http://localhost:8080/current-report/income', amount,
      {headers: this.httpHeaders});
  }

  addExpense(request: ExpenseRequest): Observable<CurrentReport> {
    return this.http.post<CurrentReport>('http://localhost:8080/current-report/expense', request,
      {headers: this.httpHeaders});
  }
}
