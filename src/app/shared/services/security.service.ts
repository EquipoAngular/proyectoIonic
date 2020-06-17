import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  TOKEN_KEY = 'token';
  public IsAuthorized: boolean;

  private authenticationSource = new Subject<boolean>();
  authenticationChallenge$ = this.authenticationSource.asObservable();

  constructor(
    private secureStorage: SecureStorageService
  ) { }

  async SetAuthorizationData(token: any) {
    await this.secureStorage.storeAsync(this.TOKEN_KEY, token);
    this.IsAuthorized = true;

    this.authenticationSource.next(true);
  }

  async GetToken() {
    return await this.secureStorage.retrieveAsync(this.TOKEN_KEY);
  }

  public Authorize() {
    this.ResetAuthorizationData();
    window.location.href = '/';
  }

  public Logoff() {
    this.ResetAuthorizationData();
    this.authenticationSource.next(false);
  }

  public ResetAuthorizationData() {
    this.secureStorage.remove(this.TOKEN_KEY);
    this.IsAuthorized = false;
  }
}
