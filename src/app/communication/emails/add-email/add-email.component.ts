import {Component, OnInit} from '@angular/core';
import {EmailEntity, EmailEntityRequest} from '../../../types';
import {EmailService} from '../../../services/email.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorDialogComponent} from "../../../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.scss']
})
export class AddEmailComponent {

  form: FormGroup;
  email: FormControl;
  subject: FormControl;
  fullContent: FormControl;
  content: string[];
  emailEntityRequest: EmailEntityRequest;

  constructor(private emailService: EmailService, private router: Router, private dialog: MatDialog) {
    this.setupFormControls();
    this.form = new FormGroup({
      "email": this.email,
      "subject": this.subject,
      "fullContent": this.fullContent
    });
  }

  setupFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.subject = new FormControl('', [
      Validators.required
    ]);
    this.fullContent = new FormControl('', [
      Validators.required
    ]);
  }

  send() {
    this.divideContent();
    this.emailEntityRequest = {
      email: this.form.get('email').value,
      subject: this.form.get('subject').value,
      content: this.content
    };
    let emailEntity: EmailEntity;
    this.emailService.sendEmail(this.emailEntityRequest)
      .subscribe(res => {
          emailEntity = res;
        },
        err => {
          this.showError(err);
        },
        () => {
          this.router.navigate(['/emails', emailEntity.id]);
        });
  }

  divideContent() {
    let i: number;
    let lastInd = 0;
    const threshold = 250;
    for (i = 0; i < Math.floor(this.form.get('fullContent').value.length / threshold); i++) {
      const firstInd = lastInd;
      const tempString = this.form.get('fullContent').value.substring(0, (i + 1) * threshold);
      lastInd = tempString.lastIndexOf(' ') + 1;
      this.content[i] = this.form.get('fullContent').value.substring(firstInd, lastInd);
    }
    this.content[i] = this.form.get('fullContent').value.substring(lastInd);
  }

  showError(err) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error
      }
    });
  }
}
