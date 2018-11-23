import {Component} from '@angular/core';
import {Token} from './token';
import {Router} from '@angular/router';
import {SetupService} from "./services/setup.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  panelOpenState = false;
  collapsedHeight = '48px';
  expandedHeight = '48px';

  constructor(private token: Token, private router: Router, private setupService: SetupService) {
    if (!this.isUserLoggedIn()) {
      this.setupService.checkSetup().subscribe(res => {
        if (res) {
          this.router.navigate(['login']);
        } else {
          this.router.navigate(['setup']);
        }
      });
    }
  }

  isUserLoggedIn(): boolean {
    return this.token.getToken() != null;
  }
}
