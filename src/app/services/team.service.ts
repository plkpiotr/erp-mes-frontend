import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from '../types';
import {Observable} from 'rxjs';
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable()
export class TeamService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchAllTeams(): Observable<Array<Team>> {
    return this.http.get<Array<Team>>(BACKEND_URL + 'teams', {headers: this.httpHeaders});
  }

  fetchOneTeam(id: number): Observable<Team> {
    return this.http.get<Team>(BACKEND_URL + 'teams/' + id, {headers: this.httpHeaders});
  }
}
