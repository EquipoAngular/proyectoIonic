import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SecureStorageService } from './secure-storage.service';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_KEY } from 'src/app/core/models/consts';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public IsAuthorized: boolean;

  private authenticationSource = new Subject<boolean>();
  authenticationChallenge$ = this.authenticationSource.asObservable();

  constructor(
    private secureStorage: SecureStorageService,
    private jwtJelper: JwtHelperService
  ) { }

  async SetAuthorizationData(token: any) {
    await this.secureStorage.storeAsync(TOKEN_KEY, token);
    this.IsAuthorized = true;
    this.authenticationSource.next(true);
  }

  async GetToken() {
    return await this.secureStorage.retrieveAsync(TOKEN_KEY);
  }

  async GetUserData(): Promise<UserDto> {
    const token = await this.GetToken();
    const tokenDecode = this.jwtJelper.decodeToken(token);
    console.log('tokenDecode', tokenDecode);

    const userData: UserDto = {} as any;
    userData.email = tokenDecode.Email;
    userData.id = tokenDecode.UserId;

    return userData;
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
    this.secureStorage.remove(TOKEN_KEY);
    this.IsAuthorized = false;
  }
}
