import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../types';
import {Router} from '@angular/router';
import {ErrorDialogComponent} from "../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  login(email: string, password: string): Observable<any> {
    const credentials = {email: email, password: password};
    return this.http.post<any>(BACKEND_URL + 'generate-token', credentials,
      {headers: this.httpHeaders});
  }

  fetchUser(): Observable<Employee> {
    return this.http.get<Employee>(BACKEND_URL + 'logged-in-user',
      {headers: this.httpHeaders});
  }

  validateUser(id: string, password: string) {
    this.http.post(BACKEND_URL + 'employees/' + id + '/validate-password', password,
      {headers: this.httpHeaders}).subscribe(res => {},
      err => {
        if (err.status == 401) {
          this.router.navigate(['/login']);
        } else {
          this.showError(err);
        }
      }, () => {
        this.router.navigate(['employees', id]);
      });
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
