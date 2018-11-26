import {Component} from '@angular/core';
import {Token} from './token';
import {Router} from '@angular/router';
import {SetupService} from "./services/setup.service";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  panelOpenState = false;
  collapsedHeight = '48px';
  expandedHeight = '48px';

  constructor(private token: Token, private router: Router, private setupService: SetupService,
              private loginService: LoginService) {
    if (!this.isUserLoggedIn()) {
      this.setupService.checkSetup().subscribe(res => {
        if (res) {
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['setup']);
        }
      });
    } else {
      this.loginService.fetchUser().subscribe(user => {
        this.router.navigate(['employees', user.id])
      });
    }
  }

  isUserLoggedIn(): boolean {
    return this.token.getToken() != null;
  }
}
