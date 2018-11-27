import {Injectable} from '@angular/core';
import {Return, ShopServiceRequest} from '../types';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BACKEND_URL, FRONTEND_URL, ReturnStatus} from "../globals";

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchAllReturns(): Observable<Array<Return>> {
    return this.http.get<Array<Return>>(BACKEND_URL + 'returns', {headers: this.httpHeaders});
  }

  fetchOneReturn(id: number): Observable<Return> {
    return this.http.get<Return>(BACKEND_URL + 'returns/' + id, {headers: this.httpHeaders});
  }

  addOneReturn(request: ShopServiceRequest): Observable<Return> {
    return this.http.post<Return>(BACKEND_URL + 'returns', request, {headers: this.httpHeaders});
  }

  updateReturnStatus(status: string, id: number): Observable<Return> {
    return this.http.put<Return>(BACKEND_URL + 'returns/' + id, status, {headers: this.httpHeaders});
  }
}
