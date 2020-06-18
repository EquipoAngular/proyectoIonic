import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { MESSAGES_WAIT, MESSAGE_GENERIC_ERROR, MsgType } from 'src/app/core/models/consts';
import { SecurityService } from 'src/app/shared/services/security.service';
import { LoginDataService } from './login-data.service';
import { AlertService } from 'src/app/core/helpers/alert.service';
import { ToastService } from 'src/app/core/helpers/toast.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private securityService: SecurityService,
    private loginDataService: LoginDataService,
    private alertService: AlertService,
    private toastService: ToastService,
    private iab: InAppBrowser
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]]
    });

  }

  ngOnInit() {
  }

  async login() {
    const loadingSpinner = await this.loadingController.create({
      message: MESSAGES_WAIT
    });

    await loadingSpinner.present();

    try {
      // Ejecuta el login
      const resp = await this.loginDataService.Login(this.loginForm.value);

      if (resp.status !== 200) {
        await this.alertService.show('Login', 'El usuario o contraseña es incorrecto.', MsgType.ERROR);
        return;
      }

      await loadingSpinner.dismiss();
      this.toastService.showSuccess('Bienvenido!');

      await this.securityService.SetAuthorizationData(resp.result.token);

    } catch (error) {
      await loadingSpinner.dismiss();
      await this.alertService.show('Login', MESSAGE_GENERIC_ERROR, MsgType.ERROR);
    }
  }

  signup() {
    const browser = this.iab.create('http://10.0.0.4:4200/register', '_blank',
      {
        location: 'yes',
        hidenavigationbuttons: 'yes',
        hideurlbar: 'yes'
      });

    browser.on('loadstop').subscribe((event) => {
      let elapsed = 0;
      console.log('** loadstop event', event);
      const loop = window.setInterval(() => {
        elapsed += 200;
        browser.executeScript({ code: 'window.popupStatus' })
          .then((values) => {
            console.log('** executeScript values', values);
            if (values[0] === 'closed' || values[0] === null) {
              browser.close();
              window.clearInterval(loop);
              this.toastService.showSuccess('El usuario se registro correctamente');
            }
            // else if ((values[0] !== 'loaded') && (elapsed > 2000)) {
            //   browser.close();
            //   window.clearInterval(loop);
            // }
          });
      }, 350);
    });

    browser.show();
  }


  get emailNoValid() {
    return this.loginForm.get('email').touched && this.loginForm.get('email').invalid;
  }

  get passwordNoValid() {
    return this.loginForm.get('password').touched && this.loginForm.get('password').invalid;
  }

}
