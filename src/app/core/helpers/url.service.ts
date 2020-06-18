import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  composeUrlAuth(postfix: string) {
    return this.composeUrl(environment.urlApiAuth, postfix);
  }

  composeUrlUsers(postfix: string) {
    return this.composeUrl(environment.urlApiUsers, postfix);
  }

  private composeUrl(urlApi: string, postfix: string) {
    urlApi = urlApi.endsWith('/') ? urlApi : `${urlApi}/`;
    urlApi += postfix.startsWith('/') ? postfix.substr(1) : postfix;
    return urlApi;
  }
}
