import { Component, OnInit } from '@angular/core';
import {Notification} from '../types';
import {NotificationService} from '../notification.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notification: Notification;
  isNotificationLoaded = false;

  constructor(private notificationService: NotificationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchNotification();
  }

  fetchNotification() {
    this.notificationService.fetchOneNotification(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.notification = res;
      }, err => {
        console.log(err);
      }, () => {
        this.isNotificationLoaded = true;
      });
  }
}
