import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Suggestion, SuggestionRequest} from '../types';
import {Observable} from 'rxjs';
import * as Global from '../global';

@Injectable()
export class SuggestionService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllSuggestions(): Observable<Array<Suggestion>> {
    return this.http.get<Array<Suggestion>>(Global.url + 'suggestions', {headers: this.httpHeaders});
  }

  fetchOneSuggestion(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(Global.url + 'suggestions/' + id, {headers: this.httpHeaders});
  }

  addSuggestion(suggestionRequest: SuggestionRequest): Observable<Suggestion> {
    return this.http.post<Suggestion>(Global.url + 'suggestions', suggestionRequest, {headers: this.httpHeaders});
  }

  setNextPhase(id: number): Observable<Suggestion> {
    return this.http.put<Suggestion>(Global.url + 'suggestions/' + id, {headers: this.httpHeaders});
  }
}
