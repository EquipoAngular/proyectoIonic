import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { ProfileDataService } from './profile-data.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { MsgType, MESSAGE_GENERIC_ERROR, MESSAGES_WAIT } from 'src/app/core/models/consts';
import { AlertService } from 'src/app/core/helpers/alert.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {
  form: FormGroup;
  user: UserDto;

  constructor(
    private fb: FormBuilder,
    private profileDataService: ProfileDataService,
    private securityService: SecurityService,
    private alertService: AlertService,
    private loadingController: LoadingController) {
    this.loadForm();
  }

  async ngOnInit() {
    const loadingSpinner = await this.loadingController.create({
      message: MESSAGES_WAIT
    });

    await loadingSpinner.present();

    try {

      const userData = await this.securityService.GetUserData();

      const userProfile = await this.profileDataService.getByEmail(userData.email);

      this.form.patchValue({ userProfile });

      await loadingSpinner.dismiss();
    } catch (error) {
      await loadingSpinner.dismiss();
      await this.alertService.show('Perfil', MESSAGE_GENERIC_ERROR, MsgType.ERROR);
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }

  reset() {
    console.log(this.form.controls.genre.value);
  }

  loadForm() {
    this.form = this.fb.group({
      id: [this.user.id, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      secondLastName: [this.user.secondLastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')]],
      birthDate: [this.user.birthDate, [Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
      genre: [this.user.genre.toString(), [Validators.required]],
      pwd: [this.user.pwd, [Validators.required]],
    });
  }

}
