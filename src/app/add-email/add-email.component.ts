import { Component, OnInit } from '@angular/core';
import {EmailEntity, EmailEntityRequest} from "../types";
import {EmailService} from "../email.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.css']
})
export class AddEmailComponent implements OnInit {

  email: string;
  subject: string;
  fullContent: string;
  content: string[];
  emailEntityRequest: EmailEntityRequest;

  constructor(private emailService: EmailService, private router: Router) { }

  ngOnInit() {
  }

  send() {
    this.divideContent();
    this.emailEntityRequest = {
      email: this.email,
      subject: this.subject,
      content: this.content
    };
    let emailEntity: EmailEntity;
    this.emailService.sendEmail(this.emailEntityRequest)
      .subscribe(res => {
          emailEntity = res;
        },
        err => {
          console.log(err);
        },
        () => {
          this.router.navigate(['/emails', emailEntity.id]);
        });
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
