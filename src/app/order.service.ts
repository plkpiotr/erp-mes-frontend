import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Order, OrderRequest} from './types';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>('http://localhost:8080/orders', {headers: this.httpHeaders});
  }

  fetchOneOrder(id: number): Observable<Order> {
    return this.http.get<Order>('http://localhost:8080/orders/' + id, {headers: this.httpHeaders});
  }

  addOneOrder(orderRequest: OrderRequest): Observable<Order> {
    return this.http.post<Order>('http://localhost:8080/orders', orderRequest, {headers: this.httpHeaders});
  }

  // TODO: It's up to @patsaf
  getRecommendations(): Observable<OrderRequest> {
    return this.http.get<OrderRequest>('http://localhost:8080/orders/recommended-delivery',
      {headers: this.httpHeaders});
  }
}
