import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../types';
import {Router} from '@angular/router';
import {ErrorDialogComponent} from "../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";
import * as Global from '../global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  login(email: string, password: string): Observable<any> {
    const credentials = {email: email, password: password};
    return this.http.post<any>(Global.url + 'generate-token', credentials,
      {headers: this.httpHeaders});
  }

  fetchUser(): Observable<Employee> {
    return this.http.get<Employee>(Global.url + 'logged-in-user',
      {headers: this.httpHeaders});
  }

  validateUser(id: string, password: string) {
    this.http.post(Global.url + 'employees/' + id + '/validate-password', password,
      {headers: this.httpHeaders}).subscribe(res => {},
      err => {
        this.showError(err);
      }, () => {
        this.router.navigate(['employees', id]);
      });
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
