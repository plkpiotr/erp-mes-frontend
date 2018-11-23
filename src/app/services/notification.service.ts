import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Notification, NotificationRequest} from '../types';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as Global from '../global';

@Injectable()
export class NotificationService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private router: Router) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', 'https://localhost:4200');
  }

  fetchAllNotifications(): Observable<Array<Notification>> {
    return this.http.get<Array<Notification>>(Global.url + 'notifications', {headers: this.httpHeaders});
  }

  fetchOneNotification(id: number): Observable<Notification> {
    return this.http.get<Notification>(Global.url + 'notifications/' + id, {headers: this.httpHeaders});
  }

  fetchNotificationsByRecipient(id: number): Observable<Array<Notification>> {
    return this.http.get<Array<Notification>>(Global.url + 'employees/' + id + '/notifications', {headers: this.httpHeaders});
  }

  addNotification(notificationRequest: NotificationRequest): Observable<Notification> {
    return this.http.post<Notification>(Global.url + 'notifications', notificationRequest, {headers: this.httpHeaders});
  }

  setNextState(id: number): Observable<Notification> {
    return this.http.put<Notification>(Global.url + 'notifications/' + id, {headers: this.httpHeaders});
  }
}
