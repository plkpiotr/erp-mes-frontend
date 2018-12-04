import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee, EmployeeRequest} from '../types';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ErrorDialogComponent} from "../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable()
export class EmployeeService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchAllEmployees(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(BACKEND_URL + 'employees',
      {headers: this.httpHeaders});
  }

  fetchColleagues(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(BACKEND_URL + 'employees/colleagues', {headers: this.httpHeaders});
  }

  fetchAllManagers(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(BACKEND_URL + 'employees', {
      headers: this.httpHeaders,
      params: {
        privilege: 'admin'
      }
    });
  }

  fetchAllNonManagers(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(BACKEND_URL + 'employees', {
      headers: this.httpHeaders,
      params: {
        privilege: 'user'
      }
    });
  }

  fetchOneEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(BACKEND_URL + 'employees/' + id,
      {headers: this.httpHeaders});
  }

  addEmployee(request: EmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(BACKEND_URL + 'employees', request,
      {headers: this.httpHeaders});
  }

  deleteEmployee(id: number) {
    this.http.delete(BACKEND_URL + 'employees/' + id, {headers: this.httpHeaders})
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
    return this.http.get<Array<Employee>>(BACKEND_URL + 'employees/' + id + '/subordinates',
      {headers: this.httpHeaders});
  }

  fetchProfile(id: number): Observable<Employee> {
    return this.http.get<Employee>(BACKEND_URL + 'profiles/' + id,
      {headers: this.httpHeaders});
  }

  showError(err) {
    this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });
  }
}
