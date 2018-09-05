import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../notification.service';
import {Router} from '@angular/router';
import {Notification} from '../types';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Array<Notification>;
  areNotificationsLoaded = false;

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.notificationService.fetchAllNotifications().subscribe(res => {
      this.notifications = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areNotificationsLoaded = true;
    });
  }

  seeNotification(id: number) {
    this.router.navigate(['/notifications', id]);
  }

  addNotification() {
    this.router.navigate(['/notifications/add']);
  }
}
