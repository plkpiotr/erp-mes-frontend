import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Employee} from "./types";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  login(email: string, password: string): Observable<any> {
    const credentials = {email: email, password: password};
    return this.http.post<any>('http://localhost:8080/generate-token', credentials,
      {headers: this.httpHeaders});
  }

  fetchUser(): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:8080/logged-in-user',
      {headers: this.httpHeaders});
  }

  validateUser(id: string, password: string) {
    this.http.post('http://localhost:8080/employees/' + id + '/validate-password', password,
      {headers: this.httpHeaders}).subscribe(res => {},
      err => {
        console.log(err);
      }, () => {
        this.router.navigate(['employees', id]);
      });
  }
}
