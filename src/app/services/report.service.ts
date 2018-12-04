import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrentReport, EstimatedCostsRequest, ExpenseRequest, MonthlyReport} from '../types';
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL)
      .set('Content-Type', 'application/json');
  }

  fetchAllReports(): Observable<Array<MonthlyReport>> {
    return this.http.get<Array<MonthlyReport>>(BACKEND_URL + 'reports',
      {headers: this.httpHeaders});
  }

  fetchOneReport(id: number): Observable<MonthlyReport> {
    return this.http.get<MonthlyReport>(BACKEND_URL + 'reports/' + id,
      {headers: this.httpHeaders});
  }

  fetchCurrentReport(): Observable<CurrentReport> {
    return this.http.get<CurrentReport>(BACKEND_URL + 'current-report',
      {headers: this.httpHeaders});
  }

  recalculateCosts(request: EstimatedCostsRequest): Observable<CurrentReport> {
    return this.http.put<CurrentReport>(BACKEND_URL + 'current-report', request,
      {headers: this.httpHeaders});
  }

  addIncome(amount: number): Observable<CurrentReport> {
    return this.http.post<CurrentReport>(BACKEND_URL + 'current-report/income', amount,
      {headers: this.httpHeaders});
  }

  addExpense(request: ExpenseRequest): Observable<CurrentReport> {
    return this.http.post<CurrentReport>(BACKEND_URL + 'current-report/expense', request,
      {headers: this.httpHeaders});
  }

  fetchRecommendations(): Observable<EstimatedCostsRequest> {
    return this.http.get<EstimatedCostsRequest>(BACKEND_URL + 'current-report/recommended-recalculations',
      {headers: this.httpHeaders});
  }
}
