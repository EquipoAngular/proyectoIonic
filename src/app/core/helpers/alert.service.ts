import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { MsgType } from '../models/consts';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  async show(header: string, message: any, icon: MsgType) {
    const iconSwal: SweetAlertIcon = icon as SweetAlertIcon;
    Swal.fire(header, message, iconSwal);
  }
}
