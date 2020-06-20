import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDto } from 'src/app/core/models/user-dto.model';
import { ProfileDataService } from './profile-data.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { MsgType, MESSAGE_GENERIC_ERROR, MESSAGES_WAIT } from 'src/app/core/models/consts';
import { AlertService } from 'src/app/core/helpers/alert.service';
import { LoadingController } from '@ionic/angular';
import { GenreType } from 'src/app/core/models/genre-type';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {
  form: FormGroup;

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
      console.log('userProfile', userProfile);
      userProfile.birthDate = userProfile.birthDate.substring(0, 10);
      //userProfile.genre 
      this.form.patchValue(userProfile);
      
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
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')]],
      birthDate: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      genre: [GenreType.OTHER, [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

}
