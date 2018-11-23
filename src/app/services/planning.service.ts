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
    return this.http.get<DailyPlan>(Global.url + 'daily-plan', {headers: this.httpHeaders});
  }

  updateDailyPlan(request: DailyPlanRequest): Observable<DailyPlan> {
    return this.http.put<DailyPlan>(Global.url + 'daily-plan', request,
      {headers: this.httpHeaders});
  }

  fetchSpecialPlans(): Observable<Array<SpecialPlan>> {
    return this.http.get<Array<SpecialPlan>>(Global.url + 'special-plans',
      {headers: this.httpHeaders});
  }

  fetchSpecialPlan(day: string): Observable<SpecialPlan> {
    return this.http.get<SpecialPlan>(Global.url + 'special-plan', {
      headers: this.httpHeaders,
      params: {
        day: day
      }
    });
  }

  addSpecialPlan(request: SpecialPlanRequest): Observable<SpecialPlan> {
    return this.http.post<SpecialPlan>('http://localhost:8080/special-plan', request,
      {headers: this.httpHeaders});
  }

  countScheduledOrders(when: string): Observable<number> {
    return this.http.get<number>('http://localhost:8080/scheduled-orders', {
      headers: this.httpHeaders,
      params: {
        when: when
      }
    });
  }

  countScheduledReturns(when: string): Observable<number> {
    return this.http.get<number>('http://localhost:8080/scheduled-returns', {
      headers: this.httpHeaders,
      params: {
        when: when
      }
    });
  }

  countScheduledComplaints(when: string): Observable<number> {
    return this.http.get<number>('http://localhost:8080/scheduled-complaints', {
      headers: this.httpHeaders,
      params: {
        when: when
      }
    });
  }

}
