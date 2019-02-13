import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {Router} from '@angular/router';
import {Notification} from '../../../types';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ErrorDialogComponent} from '../../../custom/error-dialog/error-dialog.component';

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

  constructor(private notificationService: NotificationService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.notificationService.fetchAllNotifications().subscribe(res => {
      this.notifications = res;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      } else {
        this.showError(err);
      }
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

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });

    dialogRef.afterClosed().subscribe(() => this.router.navigate(['/employees']));
  }
}
