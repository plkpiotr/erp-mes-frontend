import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailService} from '../../../services/email.service';
import {EmailEntity, EmailEntityRequest} from '../../../types';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  emails: Array<EmailEntity>;
  visibleEmails: Array<EmailEntity>;
  selectedEmail: EmailEntity;
  shouldShowResponseForm = false;

  subject: string;
  fullContent: string;
  content = new Array<string>();
  emailEntityRequest: EmailEntityRequest;

  emailsPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

  constructor(private emailService: EmailService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.fetchEmails();
  }

  fetchEmails() {
    this.emailService.fetchConversation(this.route.snapshot.params['id'])
      .subscribe(res => this.emails = res,
        err => console.log(err),
        () => {
          this.setVisibleEmails();
          this.setPageNumbers();
          this.selectedEmail = this.emails
            .filter(email => email.id === this.route.snapshot.params['id'])[0];
        });
  }

  send() {
    this.divideContent();
    this.emailEntityRequest = {
      subject: this.subject,
      content: this.content
    };
    this.emailService.reply(this.emailEntityRequest, this.route.snapshot.params['id'])
      .subscribe(res => {
        },
        err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/emails/inbox']);
        });
  }

  setVisibleEmails() {
    const pageIndex = (this.selectedPage - 1) * this.emailsPerPage;
    this.visibleEmails = this.emails.slice(
      pageIndex,
      pageIndex + this.emailsPerPage
    );
  }

  setPageNumbers() {
    this.pageNumbers = Array(
      Math.ceil(this.emails.length / this.emailsPerPage)
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
    this.setVisibleEmails();
  }

  divideContent() {
    let i: number;
    let lastInd = 0;
    const threshold = 250;
    for (i = 0; i < Math.floor(this.fullContent.length / threshold); i++) {
      const firstInd = lastInd;
      const tempString = this.fullContent.substring(0, (i + 1) * threshold);
      lastInd = tempString.lastIndexOf(' ') + 1;
      this.content[i] = this.fullContent.substring(firstInd, lastInd);
    }
    this.content[i] = this.fullContent.substring(lastInd);
  }
}
