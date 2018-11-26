import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Notification, NotificationRequest} from '../types';
import {Observable} from 'rxjs';
import {BACKEND_URL, FRONTEND_URL} from "../globals";

@Injectable()
export class NotificationService {

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders()
      .set('Access-Control-Allow-Origin', FRONTEND_URL);
  }

  fetchAllNotifications(): Observable<Array<Notification>> {
    return this.http.get<Array<Notification>>(BACKEND_URL + 'notifications', {headers: this.httpHeaders});
  }

  fetchOneNotification(id: number): Observable<Notification> {
    return this.http.get<Notification>(BACKEND_URL + 'notifications/' + id, {headers: this.httpHeaders});
  }

  fetchNotificationsByRecipient(id: number): Observable<Array<Notification>> {
    return this.http.get<Array<Notification>>(BACKEND_URL + 'employees/' + id + '/notifications', {headers: this.httpHeaders});
  }

  addNotification(notificationRequest: NotificationRequest): Observable<Notification> {
    return this.http.post<Notification>(BACKEND_URL + 'notifications', notificationRequest, {headers: this.httpHeaders});
  }

  setNextState(id: number): Observable<Notification> {
    return this.http.put<Notification>(BACKEND_URL + 'notifications/' + id, {headers: this.httpHeaders});
  }
}
