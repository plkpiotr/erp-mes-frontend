import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Suggestion, SuggestionRequest} from '../types';
import {Observable} from 'rxjs';

@Injectable()
export class SuggestionService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllSuggestions(): Observable<Array<Suggestion>> {
    return this.http.get<Array<Suggestion>>('http://localhost:8080/suggestions', {headers: this.httpHeaders});
  }

  fetchOneSuggestion(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>('http://localhost:8080/suggestions/' + id, {headers: this.httpHeaders});
  }

  fetchSuggestionsByRecipient(id: number): Observable<Array<Suggestion>> {
    return this.http.get<Array<Suggestion>>('http://localhost:8080/employees/' + id + '/tasks', {headers: this.httpHeaders});
  }

  addSuggestion(suggestionRequest: SuggestionRequest): Observable<Suggestion> {
    return this.http.post<Suggestion>('http://localhost:8080/suggestions', suggestionRequest, {headers: this.httpHeaders});
  }
}
