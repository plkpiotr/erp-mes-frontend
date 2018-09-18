import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Item, ItemRequest} from '../types';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllItems(): Observable<Array<Item>> {
    return this.http.get<Array<Item>>('http://localhost:8080/items', {headers: this.httpHeaders});
  }

  fetchOneItem(id: number): Observable<Item> {
    return this.http.get<Item>('http://localhost:8080/items/' + id, {headers: this.httpHeaders});
  }

  addNewItem(request: ItemRequest): Observable<Item> {
    return this.http.post<Item>('http://localhost:8080/items', request, {headers: this.httpHeaders});
  }

  supplyItem(id: number, quantity: number): Observable<Item> {
    return this.http.post<Item>('http://localhost:8080/items/' + id + '/supply',
      quantity, {headers: this.httpHeaders});
  }

  buyItem(id: number, quantity: number): Observable<Item> {
    return this.http.post<Item>('http://localhost:8080/items/' + id + '/buy',
      quantity, {headers: this.httpHeaders});
  }

  setSpecialOffer(percentOff: string, query: string): Observable<Array<Item>> {
    return this.http.post<Array<Item>>('http://localhost:8080/set-special-offer', '', {
      headers: this.httpHeaders,
      params: {
        percentOff: percentOff,
        query: query
      }
    });
  }

  cancelSpecialOffer(): Observable<Array<Item>> {
    return this.http.post<Array<Item>>('http://localhost:8080/cancel-special-offer', '',
      {headers: this.httpHeaders});
  }
}
