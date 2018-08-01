import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from './types';
import {Observable} from "rxjs/index";

@Injectable()
export class TeamService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllTeams(): Observable<Array<Team>> {
    return this.http.get<Array<Team>>(`http://localhost:8080/teams`, {headers: this.httpHeaders});
  }

  fetchOneTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`http://localhost:8080/teams/` + id, {headers: this.httpHeaders});
  }
}
