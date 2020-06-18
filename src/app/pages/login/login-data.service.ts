import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { UrlService } from 'src/app/core/helpers/url.service';
import { LoginResponse } from 'src/app/core/models/login-response.model';
import { ApiResponse } from 'src/app/core/models/api-response';
import { ApiRequest } from 'src/app/core/models/api-request';
import { LoginRequest } from 'src/app/core/models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  constructor(
    private dataService: DataService,
    private urlService: UrlService
  ) { }

  async Login({ email, password }) {
    const url = this.urlService.composeUrlUsers('auth/login');

    const apiReq: ApiRequest<LoginRequest> = {
      data: {
        email,
        password
      }
    };

    const response = await this.dataService.post<ApiResponse<LoginResponse>>(url, apiReq).toPromise();

    return response;
  }
}
