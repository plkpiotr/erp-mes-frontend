import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrentReport, EstimatedCostsRequest, ExpenseRequest, MonthlyReport} from '../types';
import * as Global from '../global';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Content-Type', 'application/json');
  }

  fetchAllReports(): Observable<Array<MonthlyReport>> {
    return this.http.get<Array<MonthlyReport>>(Global.url + 'reports',
      {headers: this.httpHeaders});
  }

  fetchOneReport(id: number): Observable<MonthlyReport> {
    return this.http.get<MonthlyReport>(Global.url + 'reports/' + id,
      {headers: this.httpHeaders});
  }

  fetchCurrentReport(): Observable<CurrentReport> {
    return this.http.get<CurrentReport>(Global.url + 'current-report',
      {headers: this.httpHeaders});
  }

  recalculateCosts(request: EstimatedCostsRequest): Observable<CurrentReport> {
    return this.http.put<CurrentReport>(Global.url + 'current-report', request,
      {headers: this.httpHeaders});
  }

  addIncome(amount: number): Observable<CurrentReport> {
    return this.http.post<CurrentReport>(Global.url + 'current-report/income', amount,
      {headers: this.httpHeaders});
  }

  addExpense(request: ExpenseRequest): Observable<CurrentReport> {
    return this.http.post<CurrentReport>(Global.url + 'current-report/expense', request,
      {headers: this.httpHeaders});
  }

  fetchRecommendations(): Observable<EstimatedCostsRequest> {
    return this.http.get<EstimatedCostsRequest>(Global.url + 'current-report/recommended-recalculations',
      {headers: this.httpHeaders});
  }
}
