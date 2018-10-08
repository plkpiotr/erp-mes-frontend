import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {EmailEntityRequest} from "../../../types";
import {EmailService} from "../../../services/email.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-reply-dialog',
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.scss']
})
export class ReplyDialogComponent {

  private form: FormGroup;
  private subject: FormControl;
  private fullContent: FormControl;
  content = [];
  emailEntityRequest: EmailEntityRequest;

  constructor(
    public dialogRef: MatDialogRef<ReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private emailService: EmailService) {
    this.setupFormControls();
    this.form = new FormGroup({
      "subject": this.subject,
      "content": this.fullContent,
    });
  }

  setupFormControls() {
    this.subject = new FormControl('', [
      Validators.required
    ]);
    this.fullContent = new FormControl('', [
      Validators.required
    ]);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  submit() {
    this.divideContent();
    this.emailEntityRequest = {
      email: this.data.email,
      subject: this.subject.value,
      content: this.content
    };
    this.emailService.sendEmail(this.emailEntityRequest)
      .subscribe(res => {
        },
        err => {
          console.log(err);
        },
        () => {
          this.dialogRef.close(null);
        });
  }

  divideContent() {
    let i: number;
    let lastInd = 0;
    const threshold = 250;
    for (i = 0; i < Math.floor(this.fullContent.value.length / threshold); i++) {
      const firstInd = lastInd;
      const tempString = this.fullContent.value.substring(0, (i + 1) * threshold);
      lastInd = tempString.lastIndexOf(' ') + 1;
      this.content[i] = this.fullContent.value.substring(firstInd, lastInd);
    }
    this.content[i] = this.fullContent.value.substring(lastInd);
  }

}
