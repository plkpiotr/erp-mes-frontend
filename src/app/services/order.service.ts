import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Order, ShopServiceRequest} from '../types';
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchAllOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(BACKEND_URL + 'orders', {headers: this.httpHeaders});
  }

  fetchOneOrder(id: number): Observable<Order> {
    return this.http.get<Order>(BACKEND_URL + 'orders/' + id, {headers: this.httpHeaders});
  }

  addOneOrder(orderRequest: ShopServiceRequest): Observable<Order> {
    return this.http.post<Order>(BACKEND_URL + 'orders', orderRequest, {headers: this.httpHeaders});
  }

  updateOrderStatus(status: string, id: number): Observable<Order> {
    return this.http.put<Order>(BACKEND_URL + 'orders/' + id, status, {headers: this.httpHeaders});
  }
}
