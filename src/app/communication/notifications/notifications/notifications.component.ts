import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {Router} from '@angular/router';
import {Notification, Suggestion} from '../../../types';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Array<Notification>;
  areNotificationsLoaded = false;
  displayedColumns: string[] = ['creationTime', 'state', 'type', 'id', 'instruction', 'notifier', 'transferee'];
  dataSource: MatTableDataSource<Notification> = new MatTableDataSource<Notification>();
  paginator: any;
  sort: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatSort)
  set sorting(sort: MatSort) {
    this.sort = sort;
    this.dataSource.sort = this.sort;
  }

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit() {
    this.notificationService.fetchAllNotifications().subscribe(res => {
      this.notifications = res;
    }, err => {
      console.log(err);
    }, () => {
      this.areNotificationsLoaded = true;
      this.dataSource = new MatTableDataSource<Notification>(this.notifications);
    });
  }

  seeNotification(id: number) {
    this.router.navigate(['/notifications', id]);
  }

  addNotification() {
    this.router.navigate(['/notifications/add']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
