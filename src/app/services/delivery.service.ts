import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Delivery, DeliveryItemRequest, DeliveryRequest} from '../types';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllDeliveries(): Observable<Array<Delivery>> {
    return this.http.get<Array<Delivery>>('http://localhost:8080/deliveries', {headers: this.httpHeaders});
  }

  fetchOneDelivery(id: number): Observable<Delivery> {
    return this.http.get<Delivery>('http://localhost:8080/deliveries/' + id, {headers: this.httpHeaders});
  }

  addNewDelivery(request: DeliveryRequest): Observable<Delivery> {
    return this.http.post<Delivery>('http://localhost:8080/deliveries', request, {headers: this.httpHeaders});
  }

  getRecommendations(): Observable<Array<DeliveryItemRequest>> {
    return this.http.get<Array<DeliveryItemRequest>>('http://localhost:8080/deliveries/recommended-delivery',
      {headers: this.httpHeaders});
  }
}
