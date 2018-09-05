import {Injectable} from '@angular/core';
import {Return, ReturnStatus, ShopServiceRequest} from "./types";
import {Observable} from "rxjs/index";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllReturns(): Observable<Array<Return>> {
    return this.http.get<Array<Return>>('http://localhost:8080/returns', {headers: this.httpHeaders});
  }

  fetchOneReturn(id: number): Observable<Return> {
    return this.http.get<Return>('http://localhost:8080/returns/' + id, {headers: this.httpHeaders});
  }

  addOneReturn(request: ShopServiceRequest): Observable<Return> {
    return this.http.post<Return>('http://localhost:8080/returns', request, {headers: this.httpHeaders});
  }

  updateReturnStatus(status: string, id: number): Observable<Return> {
    return this.http.put<Return>('http://localhost:8080/returns/' + id, status, {headers: this.httpHeaders});
  }
}
