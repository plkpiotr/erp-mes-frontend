import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Holiday, HolidayRequest} from './types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchHolidays(employeeId: number): Observable<Array<Holiday>> {
    return this.http.get<Array<Holiday>>('http://localhost:8080/employees/' + employeeId + '/holidays',
      {headers: this.httpHeaders});
  }

  addHoliday(request: HolidayRequest, employeeId: number) {
    this.http.post('http://localhost:8080/employees/' + employeeId + '/holidays',
      request, {headers: this.httpHeaders})
      .subscribe(() => {
        },
        err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/employees', employeeId]);
        });
  }

  fetchHolidaysToApprove(managerId: number): Observable<Array<Holiday>> {
    return this.http.get<Array<Holiday>>('http://localhost:8080/employees/' + managerId +
      '/subordinates/holiday-requests', {headers: this.httpHeaders});
  }

  manageHolidays(managerId: number, employeeId: number, holidayId: number, approve: string): Observable<Holiday> {
    return this.http.post<Holiday>('http://localhost:8080/employees/' + managerId + '/subordinates/'
      + employeeId + '/holidays', holidayId, {
      headers: this.httpHeaders,
      params: {
        approve: approve
      }
    });
  }
}
