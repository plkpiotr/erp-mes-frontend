import {Component, OnInit} from '@angular/core';
import {Notification} from '../../../types';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";
import {State} from "../../../globals";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notification: Notification;
  isNotificationLoaded = false;
  isResolved = State.RESOLVED;

  constructor(private notificationService: NotificationService, private route: ActivatedRoute,
              private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.fetchNotification();
      }
    );
  }

  fetchNotification() {
    this.notificationService.fetchOneNotification(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.notification = res;
      }, err => {
        this.showError(err, true);
      }, () => {
        this.isNotificationLoaded = true;
      });
  }

  submitForm() {
    this.notificationService.setNextState(this.route.snapshot.params[('id')])
      .subscribe(res => {
        this.notification = res;
      }, err => {
        this.showError(err, false);
      }, () => {
        this.router.navigate(['/notifications', this.route.snapshot.params[('id')]]);
      });
  }

  seeEmployee(id: number) {
    this.router.navigate(['/employees', id]);
  }

  showError(err, redirect: boolean) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });

    if (redirect) {
      dialogRef.afterClosed().subscribe(() => this.router.navigate(['/notifications']));
    }
  }
}
