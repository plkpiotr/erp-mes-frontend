import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Token} from "./token";
import {Router} from "@angular/router";
import {Observable} from "rxjs/index";
import {tap} from "rxjs/internal/operators";

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: Token, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).pipe(
      tap((err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['employees']);
            }
          }
        }
      ));
  }
}
