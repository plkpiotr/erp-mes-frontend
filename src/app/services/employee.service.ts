import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee, EmployeeRequest} from '../types';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class EmployeeService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllEmployees(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>('http://localhost:8080/employees', {headers: this.httpHeaders});
  }

  fetchColleagues(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>('http://localhost:8080/employees/colleagues', {headers: this.httpHeaders});
  }

  fetchAllManagers(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>('http://localhost:8080/employees', {
      headers: this.httpHeaders,
      params: {
        privilege: 'admin'
      }
    });
  }

  fetchAllNonManagers(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>('http://localhost:8080/employees', {
      headers: this.httpHeaders,
      params: {
        privilege: 'user'
      }
    });
  }

  fetchOneEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:8080/employees/' + id, {headers: this.httpHeaders});
  }

  addEmployee(request: EmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8080/employees', request,
      {headers: this.httpHeaders});
  }

  deleteEmployee(id: number) {
    this.http.delete('http://localhost:8080/employees/' + id, {headers: this.httpHeaders})
      .subscribe(() => {
        },
        err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/employees']);
        });
  }

  fetchSubordinates(id: number): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>('http://localhost:8080/employees/' + id + '/subordinates',
      {headers: this.httpHeaders});
  }

  fetchProfile(id: number): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:8080/profiles/' + id,
      {headers: this.httpHeaders});
  }
}
