import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
  ) {

  }

  messageBox(title?: string, message?: string, icon?: SweetAlertIcon) {
    Swal.fire(title, message, icon);
  }
}
