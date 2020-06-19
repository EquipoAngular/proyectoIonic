import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/core/helpers/url.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { UserDto } from 'src/app/core/models/user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class UserListDataService {

  constructor(
    private dataService: DataService,
    private urlService: UrlService
  ) { }

  async getAll() {
    const url = this.urlService.composeUrlUsers('users/getall');

    const response = await this.dataService.get<ApiResponse<UserDto[]>>(url).toPromise();

    return response;
  }
}
