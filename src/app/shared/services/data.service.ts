import { Injectable } from '@angular/core';
import { catchError, tap, timeout, retryWhen } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SERVICES_TIMEOUT } from 'src/app/core/models/consts';
import { genericRetryStrategy } from 'src/app/core/helpers/rxjs-utils';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient) { }

  /*******/
  /* GET */
  /*******/
  get<T>(url: string) {
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
  delete<T>(url: string) {

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

}
