import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {Token} from '../../token';
import {Employee} from '../../types';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(private router: Router,
              private loginService: LoginService,
              private token: Token) {
  }

  login() {
    this.loginService.login(this.email, this.password).subscribe(res => {
      this.token.saveToken(res.token);
    }, err => {
      console.log(err);
    }, () => {
      this.loginService.fetchUser().subscribe(res => {
        if (!res.passwordValid) {
          this.router.navigate(['employees', res.id, 'validate']);
        } else {
          this.router.navigate(['employees']);
        }
      }, err => {
        console.log(err);
      });
    });
  }

}
