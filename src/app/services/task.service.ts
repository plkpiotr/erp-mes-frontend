import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task, TaskRequest} from '../types';
import {Observable} from 'rxjs';
import * as Global from '../global';

@Injectable()
export class TaskService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(Global.url + 'tasks', {headers: this.httpHeaders});
  }

  fetchOneTask(id: number): Observable<Task> {
    return this.http.get<Task>(Global.url + 'tasks/' + id, {headers: this.httpHeaders});
  }

  fetchTasksByAssignee(id: number): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(Global.url + 'kanban/' + id, {headers: this.httpHeaders});
  }

  addTask(taskRequest: TaskRequest): Observable<Task> {
    return this.http.post<Task>(Global.url + 'tasks', taskRequest, {headers: this.httpHeaders});
  }

  setNextCategory(id: number): Observable<Task> {
    return this.http.put<Task>(Global.url + 'tasks/' + id, {headers: this.httpHeaders});
  }

  assignToMe(id: number): Observable<Task> {
    return this.http.put<Task>(Global.url + 'tasks/' + id + '/assign', {headers: this.httpHeaders});
  }
}
