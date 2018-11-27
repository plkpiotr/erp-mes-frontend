import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Delivery, DeliveryItemRequest, DeliveryRequest} from '../types';
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchAllDeliveries(): Observable<Array<Delivery>> {
    return this.http.get<Array<Delivery>>(BACKEND_URL + 'deliveries', {headers: this.httpHeaders});
  }

  fetchOneDelivery(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(BACKEND_URL + 'deliveries/' + id, {headers: this.httpHeaders});
  }

  addNewDelivery(request: DeliveryRequest): Observable<Delivery> {
    return this.http.post<Delivery>(BACKEND_URL + 'deliveries', request, {headers: this.httpHeaders});
  }

  confirmDelivery(id: number): Observable<Delivery> {
    return this.http.post<Delivery>(BACKEND_URL + 'deliveries/' + id, null, {headers: this.httpHeaders});
  }

  getRecommendations(): Observable<Array<DeliveryItemRequest>> {
    return this.http.get<Array<DeliveryItemRequest>>(BACKEND_URL + 'deliveries/recommended-delivery',
      {headers: this.httpHeaders});
  }
}
