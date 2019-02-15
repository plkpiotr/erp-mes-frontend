import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Suggestion, SuggestionRequest} from '../types';
import {Observable} from 'rxjs';
import {BACKEND_URL, FRONTEND_URL} from '../globals';

@Injectable()
export class SuggestionService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchAllSuggestions(): Observable<Array<Suggestion>> {
    return this.http.get<Array<Suggestion>>(BACKEND_URL + 'suggestions', {headers: this.httpHeaders});
  }

  fetchOneSuggestion(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(BACKEND_URL + 'suggestions/' + id, {headers: this.httpHeaders});
  }

  addSuggestion(suggestionRequest: SuggestionRequest): Observable<Suggestion> {
    return this.http.post<Suggestion>(BACKEND_URL + 'suggestions', suggestionRequest, {headers: this.httpHeaders});
  }

  setNextPhase(id: number): Observable<Suggestion> {
    return this.http.put<Suggestion>(BACKEND_URL + 'suggestions/' + id, {headers: this.httpHeaders});
  }
}
