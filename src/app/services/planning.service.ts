import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {DailyPlan, DailyPlanRequest, SpecialPlan, SpecialPlanRequest} from '../types';
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchDailyPlan(): Observable<DailyPlan> {
    return this.http.get<DailyPlan>(BACKEND_URL + 'daily-plan', {headers: this.httpHeaders});
  }

  updateDailyPlan(request: DailyPlanRequest): Observable<DailyPlan> {
    return this.http.put<DailyPlan>(BACKEND_URL + 'daily-plan', request,
      {headers: this.httpHeaders});
  }

  fetchSpecialPlans(): Observable<Array<SpecialPlan>> {
    return this.http.get<Array<SpecialPlan>>(BACKEND_URL + 'special-plans',
      {headers: this.httpHeaders});
  }

  fetchSpecialPlan(day: string): Observable<SpecialPlan> {
    return this.http.get<SpecialPlan>(BACKEND_URL + 'special-plan', {
      headers: this.httpHeaders,
      params: {
        day: day
      }
    });
  }

  addSpecialPlan(request: SpecialPlanRequest): Observable<SpecialPlan> {
    return this.http.post<SpecialPlan>(BACKEND_URL + 'special-plan', request,
      {headers: this.httpHeaders});
  }

  countScheduledOrders(when: string): Observable<number> {
    return this.http.get<number>(BACKEND_URL + 'scheduled-orders', {
      headers: this.httpHeaders,
      params: {
        when: when
      }
    });
  }

  countScheduledReturns(when: string): Observable<number> {
    return this.http.get<number>(BACKEND_URL + 'scheduled-returns', {
      headers: this.httpHeaders,
      params: {
        when: when
      }
    });
  }

  countScheduledComplaints(when: string): Observable<number> {
    return this.http.get<number>(BACKEND_URL + 'scheduled-complaints', {
      headers: this.httpHeaders,
      params: {
        when: when
      }
    });
  }

}
