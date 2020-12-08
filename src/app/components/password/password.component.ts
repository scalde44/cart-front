import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public ema: string = '';
  constructor(private authFirebaseService: AuthFirebaseService,) { }

  ngOnInit(): void {
  }

  async recuperar() {
    try {
      await this.authFirebaseService.resetPassword(this.ema);
      Swal.fire(
        'Email enviado a ' + this.ema,
        'Revisa tu bandeja de entrada para reestablecer la contraseña',
        'success'
      );
    } catch (error) {
      Swal.fire(
        'Error',
        error.message,
        'error'
      );
    }
  }

}
