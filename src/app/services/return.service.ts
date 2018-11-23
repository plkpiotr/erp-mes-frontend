import {Injectable} from '@angular/core';
import {Return, ReturnStatus, ShopServiceRequest} from '../types';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as Global from '../global';

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
    return this.http.get<Array<Return>>(Global.backendUrl + 'returns', {headers: this.httpHeaders});
  }

  fetchOneReturn(id: number): Observable<Return> {
    return this.http.get<Return>(Global.backendUrl + 'returns/' + id, {headers: this.httpHeaders});
  }

  addOneReturn(request: ShopServiceRequest): Observable<Return> {
    return this.http.post<Return>(Global.backendUrl + 'returns', request, {headers: this.httpHeaders});
  }

  updateReturnStatus(status: string, id: number): Observable<Return> {
    return this.http.put<Return>(Global.backendUrl + 'returns/' + id, status, {headers: this.httpHeaders});
  }
}
