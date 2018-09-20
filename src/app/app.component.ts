import {Component} from '@angular/core';
import {Token} from './token';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  panelOpenState = false;

  constructor(private token: Token, private router: Router) {
    if (!this.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  isUserLoggedIn(): boolean {
    return this.token.getToken() != null;
  }

}
