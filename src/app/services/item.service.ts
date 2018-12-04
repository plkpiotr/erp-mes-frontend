import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item, ItemRequest} from '../types';
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL)
      .set('Content-Type', 'application/json');
  }

  fetchAllItems(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(BACKEND_URL + 'items', {headers: this.httpHeaders});
  }

  fetchOneItem(id: number): Observable<Item> {
    return this.http.get<Item>(BACKEND_URL + 'items/' + id, {headers: this.httpHeaders});
  }

  addNewItem(request: ItemRequest): Observable<Item> {
    return this.http.post<Item>(BACKEND_URL + 'items', request, {headers: this.httpHeaders});
  }

  setNewPrice(id: number, price: number): Observable<Item> {
    return this.http.post<Item>(BACKEND_URL + 'items/' + id, price, {headers: this.httpHeaders});
  }

  supplyItem(id: number, quantity: number): Observable<Item> {
    return this.http.post<Item>(BACKEND_URL + 'items/' + id + '/supply',
      quantity, {headers: this.httpHeaders});
  }

  buyItem(id: number, quantity: number): Observable<Item> {
    return this.http.post<Item>(BACKEND_URL + 'items/' + id + '/buy',
      quantity, {headers: this.httpHeaders});
  }

  setSpecialOffer(percentOff: string, query: string): Observable<Array<Item>> {
    return this.http.post<Array<Item>>(BACKEND_URL + 'set-special-offer', '', {
      headers: this.httpHeaders,
      params: {
        percentOff: percentOff,
        query: query
      }
    });
  }

  cancelSpecialOffer(): Observable<Array<Item>> {
    return this.http.post<Array<Item>>(BACKEND_URL + 'cancel-special-offer', '',
      {headers: this.httpHeaders});
  }
}
