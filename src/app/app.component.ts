import {Component} from '@angular/core';
import {Token} from './token';
import {Router} from '@angular/router';
import {SetupService} from './services/setup.service';
import {LoginService} from './services/login.service';
import {BACKEND_URL, FRONTEND_URL} from './globals';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  collapsedHeight = '48px';
  expandedHeight = '48px';
  serverUrl = BACKEND_URL + 'socket';
  stompClient;

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
    } else if (window.location.href === FRONTEND_URL) {
      this.loginService.fetchUser().subscribe(user => {
        this.router.navigate(['employees', user.id]);
      });
    }
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function () {
      that.stompClient.debug = () => {};
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          $('#chat').append('<div class="message">' + message.body + '</div>');
        }
      });
    });
  }

  sendMessage(message) {
    this.loginService.fetchUser().subscribe(res => {
      const name = res.firstName;
      this.stompClient.send('/app/send/message', {}, name + ' | ' + message);
      $('#input').val('');
      window.setInterval(function() {
        const elem = document.getElementById('chat');
        elem.scrollTop = elem.scrollHeight;
      }, 500);
    });
  }

  isUserLoggedIn(): boolean {
    return this.token.getToken() != null;
  }

  visitMyProfile() {
    this.loginService.fetchUser().subscribe(user => {
      this.router.navigate(['employees', user.id]);
    });
  }
}
