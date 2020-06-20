import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { UserListDataService } from './user-list-data.service';
import { LoadingController } from '@ionic/angular';
import { MESSAGES_WAIT, MESSAGE_GENERIC_ERROR, MsgType } from 'src/app/core/models/consts';
import { AlertService } from 'src/app/core/helpers/alert.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'user-list.page.html',
  styleUrls: ['user-list.page.scss']
})
export class UserListTabPage implements OnInit {

  users: UserDto[];

  constructor(
    private loadingController: LoadingController,
    private userListDataService: UserListDataService,
    private alertService: AlertService
  ) { }

  async ngOnInit() {
    const loadingSpinner = await this.loadingController.create({
      message: MESSAGES_WAIT
    });

    await loadingSpinner.present();

    try {
      const resp = await this.userListDataService.getAll();
      this.users = resp.result;

      await loadingSpinner.dismiss();
    } catch (error) {
      await loadingSpinner.dismiss();
      await this.alertService.show('Usuarios', MESSAGE_GENERIC_ERROR, MsgType.ERROR);
    }
  }

  async delete(item: UserDto, idx: number) {

    console.log(item, idx);

    await this.users.splice(idx, 1);
  }

}
