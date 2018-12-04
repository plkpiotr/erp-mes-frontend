import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {Token} from '../../token';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorDialogComponent} from "../../custom/error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private router: Router,
              private loginService: LoginService,
              private token: Token,
              private dialog: MatDialog) {
    this.setupFormControls();
    this.form = new FormGroup({
      "email": this.email,
      "password": this.password
    });
  }
  setupFormControls() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required
    ]);
  }


  login() {
    this.loginService.login(this.form.get('email').value, this.form.get('password').value).subscribe(res => {
      this.token.saveToken(res.token);
    }, err => {
      this.showError(err);
    }, () => {
      this.loginService.fetchUser().subscribe(res => {
        if (!res.passwordValid) {
          this.router.navigate(['employees', res.id, 'validate']);
        } else {
          this.router.navigate(['employees']);
        }
      }, err => {
        this.showError(err);
      });
    });
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
