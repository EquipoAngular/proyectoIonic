import { Injectable } from '@angular/core';
import { throwError, Observable, timer } from 'rxjs';
import { catchError, tap, retry, timeout, mergeMap, finalize, retryWhen } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { SecurityService } from './security.service';
import { SERVICES_TIMEOUT } from 'src/app/core/models/consts';
import { genericRetryStrategy } from 'src/app/core/helpers/rxjs-utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private securityService: SecurityService) { }

  /*******/
  /* GET */
  /*******/
  get<T>(url: string, params?: any) {
    return this.http.get<T>(url)
      .pipe(
        retryWhen(genericRetryStrategy()),
        timeout(SERVICES_TIMEOUT),
        tap((res: T) => {
          return res;
        }),
        catchError(err => {
          throw (err);
        })
      );
  }

  /********/
  /* POST */
  /********/
  post<T>(url: string, data: any) {
    return this.doPost<T>(url, data);
  }

  private doPost<T>(url: string, data: any) {
    return this.http.post<T>(url, data)
      .pipe(
        retryWhen(genericRetryStrategy()),
        timeout(SERVICES_TIMEOUT),
        tap((res: T) => {
          return res;
        }),
        catchError(err => {
          throw (err);
        })
      );
  }

  /*******/
  /* PUT */
  /*******/
  public put<T>(url: string, data: any) {
    return this.doPut<T>(url, data);
  }

  private doPut<T>(url: string, data: any) {
    return this.http.put<T>(url, data)
      .pipe(
        retryWhen(genericRetryStrategy()),
        timeout(SERVICES_TIMEOUT),
        tap((res: T) => {
          return res;
        }),
        catchError(err => {
          throw (err);
        })
      );
  }

  /*******/
  /* DEL */
  /*******/
  delete<T>(url: string, params?: any) {

    return this.http.delete<T>(url)
      .pipe(
        retryWhen(genericRetryStrategy()),
        timeout(SERVICES_TIMEOUT),
        tap((res: T) => {
          return res;
        }),
        catchError(err => {
          throw (err);
        })
      );
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side network error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error('Backend - ' +
        `status: ${error.status}, ` +
        `statusText: ${error.statusText}, ` +
        `message: ${error.error.message}`);
    }

    // return an observable with a user-facing error message
    return throwError(error || 'server error');
  }
}
