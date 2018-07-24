import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Team, TeamRequest} from './types';
import {Observable} from "rxjs/index";

@Injectable()
export class TeamService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllTeams(): Observable<Array<Team>> {
    return this.http.get<Array<Team>>(`http://localhost:8080/teams`, {headers: this.httpHeaders});
  }

  fetchOneTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`http://localhost:8080/teams/` + id, {headers: this.httpHeaders});
  }

  addTeam(request: TeamRequest): Observable<Team> {
    return this.http.post<Team>(`http://localhost:8080/teams`, request,
      {headers: this.httpHeaders});
  }

  deleteTeam(id: number) {
    this.http.delete('http://localhost:8080/teams/' + id, {headers: this.httpHeaders})
      .subscribe(() => {
        },
        err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/teams']);
        });
  }

}
