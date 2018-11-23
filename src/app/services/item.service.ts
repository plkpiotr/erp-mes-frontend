import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Item, ItemRequest} from '../types';
import * as Global from '../global';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200')
      .set('Content-Type', 'application/json');
  }

  fetchAllItems(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(Global.url + 'items', {headers: this.httpHeaders});
  }

  fetchOneItem(id: number): Observable<Item> {
    return this.http.get<Item>(Global.url + 'items/' + id, {headers: this.httpHeaders});
  }

  addNewItem(request: ItemRequest): Observable<Item> {
    return this.http.post<Item>(Global.url + 'items', request, {headers: this.httpHeaders});
  }

  setNewPrice(id: number, price: number): Observable<Item> {
    return this.http.post<Item>(Global.url + 'items/' + id, price, {headers: this.httpHeaders});
  }

  supplyItem(id: number, quantity: number): Observable<Item> {
    return this.http.post<Item>(Global.url + 'items/' + id + '/supply',
      quantity, {headers: this.httpHeaders});
  }

  buyItem(id: number, quantity: number): Observable<Item> {
    return this.http.post<Item>(Global.url + 'items/' + id + '/buy',
      quantity, {headers: this.httpHeaders});
  }

  setSpecialOffer(percentOff: string, query: string): Observable<Array<Item>> {
    return this.http.post<Array<Item>>(Global.url + 'set-special-offer', '', {
      headers: this.httpHeaders,
      params: {
        percentOff: percentOff,
        query: query
      }
    });
  }

  cancelSpecialOffer(): Observable<Array<Item>> {
    return this.http.post<Array<Item>>(Global.url + 'cancel-special-offer', '',
      {headers: this.httpHeaders});
  }
}
