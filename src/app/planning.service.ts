import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {DailyPlan, DailyPlanRequest, SpecialPlan, SpecialPlanRequest} from "./types";

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
    return this.http.get<DailyPlan>('http://localhost:8080/daily-plan', {headers: this.httpHeaders});
  }

  updateDailyPlan(request: DailyPlanRequest): Observable<DailyPlan> {
    return this.http.put<DailyPlan>('http://localhost:8080/daily-plan', request,
      {headers: this.httpHeaders});
  }

  fetchSpecialPlans(): Observable<Array<SpecialPlan>> {
    return this.http.get<Array<SpecialPlan>>('http://localhost:8080/special-plans',
      {headers: this.httpHeaders});
  }

  fetchSpecialPlan(day: string): Observable<SpecialPlan> {
    return this.http.get<SpecialPlan>('http://localhost:8080/special-plan', {
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

}
