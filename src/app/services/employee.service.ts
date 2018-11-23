import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee, EmployeeRequest} from '../types';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ErrorDialogComponent} from '../custom/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';
import * as Global from '../global';

@Injectable()
export class EmployeeService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllEmployees(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(Global.backendUrl + 'employees', {headers: this.httpHeaders});
  }

  fetchColleagues(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(Global.backendUrl + 'colleagues', {headers: this.httpHeaders});
  }

  fetchAllManagers(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(Global.backendUrl + 'employees', {
      headers: this.httpHeaders,
      params: {
        privilege: 'admin'
      }
    });
  }

  fetchAllNonManagers(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(Global.backendUrl + 'employees', {
      headers: this.httpHeaders,
      params: {
        privilege: 'user'
      }
    });
  }

  fetchOneEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(Global.backendUrl + 'employees/' + id, {headers: this.httpHeaders});
  }

  addEmployee(request: EmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(Global.backendUrl + 'employees', request,
      {headers: this.httpHeaders});
  }

  deleteEmployee(id: number) {
    this.http.delete(Global.backendUrl + 'employees/' + id, {headers: this.httpHeaders})
      .subscribe(() => {
        },
        err => {
          this.showError(err);
        },
        () => {
          this.router.navigate(['/employees']);
        });
  }

  fetchSubordinates(id: number): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(Global.backendUrl + 'employees/' + id + '/subordinates',
      {headers: this.httpHeaders});
  }

  fetchProfile(id: number): Observable<Employee> {
    return this.http.get<Employee>(Global.backendUrl + 'profiles/' + id,
      {headers: this.httpHeaders});
  }

  showError(err) {
    this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });
  }
}
