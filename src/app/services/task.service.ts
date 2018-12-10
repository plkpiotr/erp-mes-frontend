import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssignmentRequest, Indicators, Task, TaskRequest} from '../types';
import {Observable} from 'rxjs';
import {BACKEND_URL, FRONTEND_URL} from '../globals';

@Injectable()
export class TaskService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchAllTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(BACKEND_URL + 'tasks', {headers: this.httpHeaders});
  }

  fetchOneTask(id: number): Observable<Task> {
    return this.http.get<Task>(BACKEND_URL + 'tasks/' + id, {headers: this.httpHeaders});
  }

  fetchTasksByAssignee(id: number): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(BACKEND_URL + 'kanban/' + id, {headers: this.httpHeaders});
  }

  fetchTasksByAssigneeIsNull(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(BACKEND_URL + 'assignment', {headers: this.httpHeaders});
  }

  addTask(taskRequest: TaskRequest): Observable<Task> {
    return this.http.post<Task>(BACKEND_URL + 'tasks', taskRequest, {headers: this.httpHeaders});
  }

  assignToEmployees(assignmentRequest: AssignmentRequest): Observable<Array<AssignmentRequest>> {
    return this.http.put<Array<AssignmentRequest>>(BACKEND_URL + 'assignment', assignmentRequest, {headers: this.httpHeaders});
  }

  setNextCategory(id: number): Observable<Task> {
    return this.http.put<Task>(BACKEND_URL + 'tasks/' + id, {headers: this.httpHeaders});
  }

  assignToMe(id: number): Observable<Task> {
    return this.http.put<Task>(BACKEND_URL + 'tasks/' + id + '/assign', {headers: this.httpHeaders});
  }

  fetchIndicators(id: number): Observable<Indicators> {
    return this.http.get<Indicators>(BACKEND_URL + 'indicators/' + id, {headers: this.httpHeaders});
  }
}
