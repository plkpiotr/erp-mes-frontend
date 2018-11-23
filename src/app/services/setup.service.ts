import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminRequest, Employee} from "../types";

@Injectable()
export class SetupService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  checkSetup(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8080/check-setup', {headers: this.httpHeaders});
  }

  setupAdmin(request: AdminRequest): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8080/setup-admin', request, {headers: this.httpHeaders});
  }

  setupTeams(): Observable<any> {
    return this.http.post<any>('http://localhost:8080/setup-teams', {headers: this.httpHeaders});
  }

  setupDailyPlan(): Observable<any> {
    return this.http.post<any>('http://localhost:8080/setup-daily-plan', {headers: this.httpHeaders});
  }

  setupReports(): Observable<any> {
    return this.http.post<any>('http://localhost:8080/setup-reports', {headers: this.httpHeaders});
  }

}
