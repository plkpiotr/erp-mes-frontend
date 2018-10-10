import {Component, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmailService} from '../../../services/email.service';
import {EmailEntity} from '../../../types';
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {ReplyDialogComponent} from "../reply-dialog/reply-dialog.component";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  emails: Array<EmailEntity>;
  selectedEmail: EmailEntity;
  obs: Observable<any>;
  dataSource: MatTableDataSource<EmailEntity> = new MatTableDataSource([]);
  paginator: any;

  @ViewChild(MatPaginator)
  set pagination(paginator: MatPaginator) {
    this.paginator = paginator;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private emailService: EmailService, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchEmails();
  }

  getContent(content: string[]) {
    let result = '';
    content.forEach(string => result += string);
    return result;
  }

  fetchEmails() {
    this.emailService.fetchConversation(this.route.snapshot.params['id'])
      .subscribe(res => this.emails = res,
        err => console.log(err),
        () => {
          this.dataSource = new MatTableDataSource(this.emails);
          this.obs = this.dataSource.connect();
          this.selectedEmail = this.emails
            .filter(email => email.id.toString() === this.route.snapshot.params['id'])[0];
        });
  }

  send() {
    const dialogRef = this.dialog.open(ReplyDialogComponent, {
      width: '350px',
      data: {email: this.selectedEmail.email}
    });

    dialogRef.afterClosed().subscribe(res => this.fetchEmails());
  }
}
