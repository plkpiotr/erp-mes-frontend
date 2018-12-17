import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  serverUrl = 'http://localhost:8080/socket';
  stompClient;
  name;

  constructor(private loginService: LoginService, private router: Router) {
    this.initializeWebSocketConnetion();
  }

  ngOnInit() {
  }

  initializeWebSocketConnetion() {
    this.loginService.fetchUser().subscribe(user => {
      this.name = user.firstName;
    });
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          $('.chat').append('<div class="message">' + that.name + ' ' + message.body + '</div>');
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/send/message', {}, message);
    $('#input').val('');
  }

  openForm() {
    document.getElementById('myForm').style.display = 'block';
  }

  closeForm() {
    document.getElementById('myForm').style.display = 'none';
  }
}

// tuxcjmse
