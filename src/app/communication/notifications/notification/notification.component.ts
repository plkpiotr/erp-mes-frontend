import {Component, OnInit} from '@angular/core';
import {Notification, State} from '../../../types';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notification: Notification;
  isNotificationLoaded = false;
  isResolved;

  constructor(private notificationService: NotificationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.fetchNotification();
    this.isResolved = State.RESOLVED;
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

  submitForm() {
    this.notificationService.setNextState(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.notification = res;
      }, err => {
        console.log(err);
      }, () => {
        this.router.navigate(['/notifications']);
      });
  }

  seeEmployee(id: number) {
    this.router.navigate(['/employees', id]);
  }
}
