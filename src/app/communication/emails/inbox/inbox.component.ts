import {Component, OnInit, ViewChild} from '@angular/core';
import {EmailEntity} from '../../../types';
import {EmailService} from '../../../services/email.service';
import {Router} from '@angular/router';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {Observable} from "rxjs/index";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  emails: Array<EmailEntity>;
  areEmailsLoaded: boolean;
  obs: Observable<any>;
  dataSource: MatTableDataSource<EmailEntity> = new MatTableDataSource([]);
  paginator: any;

  constructor(private emailService: EmailService, private router: Router, private dialog: MatDialog) {
  }

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.fetchEmails();
  }

  fetchEmails() {
    this.emailService.fetchReceivedEmails().subscribe(res => this.emails = res,
      err => {
        if (err.status == 401) {
          this.router.navigate(['/login']);
        } else {
          this.showError(err);
        }
      },
      () => {
        this.areEmailsLoaded = true;
        this.dataSource = new MatTableDataSource(this.emails);
        this.obs = this.dataSource.connect();
      });
  }

  sendEmail() {
    this.router.navigate(['/emails/add']);
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
