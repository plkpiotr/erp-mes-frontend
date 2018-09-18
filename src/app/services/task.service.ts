import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task, TaskRequest} from '../types';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class TaskService {

  private readonly httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>('http://localhost:8080/tasks', {headers: this.httpHeaders});
  }

  fetchOneTask(id: number): Observable<Task> {
    return this.http.get<Task>('http://localhost:8080/tasks/' + id, {headers: this.httpHeaders});
  }

  fetchTasksByAssignee(id: number): Observable<Array<Task>> {
    return this.http.get<Array<Task>>('http://localhost:8080/employees/' + id + '/tasks', {headers: this.httpHeaders});
  }

  addTask(taskRequest: TaskRequest): Observable<Task> {
    return this.http.post<Task>('http://localhost:8080/tasks', taskRequest, {headers: this.httpHeaders});
  }

  deleteTask(id: number) {
    this.http.delete('http://localhost:8080/tasks/' + id, {headers: this.httpHeaders})
      .subscribe(() => {
        },
        err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/tasks']);
        });
  }
}
