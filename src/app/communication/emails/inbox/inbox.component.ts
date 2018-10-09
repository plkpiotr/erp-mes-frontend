import {Component, OnInit, ViewChild} from '@angular/core';
import {EmailEntity} from '../../../types';
import {EmailService} from '../../../services/email.service';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from "@angular/material";
import {Observable} from "rxjs/index";

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

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private emailService: EmailService, private router: Router) {
  }

  ngOnInit() {
    this.fetchEmails();
  }

  fetchEmails() {
    this.emailService.fetchReceivedEmails().subscribe(res => this.emails = res,
      err => console.log(err),
      () => {
        this.areEmailsLoaded = true;
        this.dataSource = new MatTableDataSource(this.emails);
        this.obs = this.dataSource.connect();
      });
  }

  sendEmail() {
    this.router.navigate(['/emails/add']);
  }
}
