import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdminRequest, Employee} from "../types";
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable()
export class SetupService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  checkSetup(): Observable<boolean> {
    return this.http.get<boolean>(BACKEND_URL + 'check-setup', {headers: this.httpHeaders});
  }

  setupAdmin(request: AdminRequest): Observable<Employee> {
    return this.http.post<Employee>(BACKEND_URL + 'setup-admin', request, {headers: this.httpHeaders});
  }

  setupTeams(): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'setup-teams', {headers: this.httpHeaders});
  }

  setupDailyPlan(): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'setup-daily-plan', {headers: this.httpHeaders});
  }

  setupReports(): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'setup-reports', {headers: this.httpHeaders});
  }

}
