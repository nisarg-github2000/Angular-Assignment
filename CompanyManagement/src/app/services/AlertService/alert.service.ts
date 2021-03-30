import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  successAlert(title: string, msg: string) {
    return Swal.fire({ title, text: msg, icon: 'success' });
  }

  failureAlert(title: string, msg: string) {
    return Swal.fire({ title, text: msg, icon: 'error' });
  }

  confirmationAlert(title: string, msg: string) {
    return Swal.fire({
      title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });
  }
}
