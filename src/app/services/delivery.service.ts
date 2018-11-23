import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Delivery, DeliveryItemRequest, DeliveryRequest} from '../types';
import * as Global from '../global';

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
    return this.http.get<Array<Delivery>>(Global.backendUrl + 'deliveries', {headers: this.httpHeaders});
  }

  fetchOneDelivery(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(Global.backendUrl + 'deliveries/' + id, {headers: this.httpHeaders});
  }

  addNewDelivery(request: DeliveryRequest): Observable<Delivery> {
    return this.http.post<Delivery>(Global.backendUrl + 'deliveries', request, {headers: this.httpHeaders});
  }

  confirmDelivery(id: number): Observable<Delivery> {
    return this.http.post<Delivery>(Global.backendUrl + 'deliveries/' + id, null, {headers: this.httpHeaders});
  }

  getRecommendations(): Observable<Array<DeliveryItemRequest>> {
    return this.http.get<Array<DeliveryItemRequest>>(Global.backendUrl + 'deliveries/recommended-delivery',
      {headers: this.httpHeaders});
  }
}
