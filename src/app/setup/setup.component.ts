import { Component, OnInit } from '@angular/core';
import {ErrorDialogComponent} from "../custom/error-dialog/error-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SetupService} from "../services/setup.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  adminRequest;
  form: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  accountNumber: FormControl;
  salary: FormControl;

  constructor(private setupService: SetupService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.setupFormControls();
    this.form = new FormGroup({
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "password": this.password,
      "accountNumber": this.accountNumber,
      "salary": this.salary
    });
  }

  setupFormControls() {
    this.firstName = new FormControl('', [
      Validators.required
    ]);
    this.lastName = new FormControl('', [
      Validators.required
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required
    ]);
    this.accountNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(26),
      Validators.maxLength(26),
      Validators.pattern("^[0-9]*$"),
    ]);
    this.salary = new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]);
  }

  submitForm() {
    this.adminRequest = {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value,
      contractRequest: {
        accountNumber: this.form.get('accountNumber').value,
        daysOffPerYear: 365,
        salary: this.form.get('salary').value
      }
    };
    this.setupService.setupTeams()
      .subscribe(() => {
          this.setupService.setupAdmin(this.adminRequest).subscribe(() => {
          }, () => {
          }, () => {
          });
          this.setupService.setupDailyPlan().subscribe(() => {
          }, () => {
          }, () => {
          });
          this.setupService.setupReports().subscribe(() => {
          }, () => {
          }, () => {
          });
        },
        err => this.showError(err),
        () => {});

    setTimeout(() => {
      this.router.navigate(['/login']);
  }, 1000);
  }

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  showError(err) {
    this.dialog.open(ErrorDialogComponent, {
      width: '700px',
      data: {
        error: err.error,
        status: err.status
      }
    });
  }

}
