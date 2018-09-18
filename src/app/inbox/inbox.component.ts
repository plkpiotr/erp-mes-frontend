import {Component, OnInit} from '@angular/core';
import {EmailEntity} from "../types";
import {EmailService} from "../email.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  emails: Array<EmailEntity>;
  visibleEmails: Array<EmailEntity>;

  emailsPerPage = 15;
  selectedPage = 1;
  pageNumbers: number[];

  constructor(private emailService: EmailService, private router: Router) {
  }

  ngOnInit() {
    this.fetchEmails();
  }

  fetchEmails() {
    this.emailService.fetchReceivedEmails().subscribe(res => this.emails = res,
      err => console.log(err),
      () => {
        this.setVisibleEmails();
        this.setPageNumbers();
      });
  }

  seeConversation(id: number) {
    this.router.navigate(['/emails', id]);
  }

  sendEmail() {
    this.router.navigate(['/emails/add']);
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
}
