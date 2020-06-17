import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(
    private securityService: SecurityService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.securityService.GetToken();

    if (token) {
      // clone: https://angular.io/guide/http#immutability
      request = request.clone({
        setHeaders: {
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
