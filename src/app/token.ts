import { Injectable } from '@angular/core';

@Injectable()
export class Token {

  constructor() { }

  public saveToken(token: string) {
    window.sessionStorage.removeItem('AuthToken');
    window.sessionStorage.setItem('AuthToken',  token);
  }

  public getToken(): string {
    return sessionStorage.getItem('AuthToken');
  }
}
