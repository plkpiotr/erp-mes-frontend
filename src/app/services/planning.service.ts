import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {DailyPlan, DailyPlanRequest, SpecialPlan, SpecialPlanRequest} from '../types';
import * as Global from '../global';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchDailyPlan(): Observable<DailyPlan> {
    return this.http.get<DailyPlan>(Global.backendUrl + 'daily-plan', {headers: this.httpHeaders});
  }

  updateDailyPlan(request: DailyPlanRequest): Observable<DailyPlan> {
    return this.http.put<DailyPlan>(Global.backendUrl + 'daily-plan', request,
      {headers: this.httpHeaders});
  }

  fetchSpecialPlans(): Observable<Array<SpecialPlan>> {
    return this.http.get<Array<SpecialPlan>>(Global.backendUrl + 'special-plans',
      {headers: this.httpHeaders});
  }

  fetchSpecialPlan(day: string): Observable<SpecialPlan> {
    return this.http.get<SpecialPlan>(Global.backendUrl + 'special-plan', {
      headers: this.httpHeaders,
      params: {
        day: day
      }
    });
  }

  addSpecialPlan(request: SpecialPlanRequest): Observable<SpecialPlan> {
    return this.http.post<SpecialPlan>(Global.backendUrl + 'special-plan', request,
      {headers: this.httpHeaders});
  }

  countScheduledOrders(when: string): Observable<number> {
    return this.http.get<number>(Global.backendUrl + 'scheduled-orders', {
      headers: this.httpHeaders,
      params: {
        when: when
      }
    });
  }

  countScheduledReturns(when: string): Observable<number> {
    return this.http.get<number>(Global.backendUrl + 'scheduled-returns', {
      headers: this.httpHeaders,
      params: {
        when: when
      }
    });
  }

  countScheduledComplaints(when: string): Observable<number> {
    return this.http.get<number>(Global.backendUrl + 'scheduled-complaints', {
      headers: this.httpHeaders,
      params: {
        when: when
      }
    });
  }

}
